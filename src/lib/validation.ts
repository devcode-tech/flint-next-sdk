import { z } from "zod";
import { FormField, FormSchema } from "@/lib/types";
import { validateAge, validateCanadianPostalCode, isValidFileType } from "@/lib/utils";

export function createFieldValidation(field: FormField): z.ZodTypeAny {
  let validation: any;

  switch (field.type) {
    case 'text':
      if (field.required) {
        const errorMessage = field.validation.requiredMessage || `${field.name} is required`;
        validation = z.string({ required_error: errorMessage })
          .min(1, { message: errorMessage });
      } else {
        validation = z.string().optional();
      }
      break;

    case 'email':
      if (field.required) {
        const requiredMessage = field.validation.requiredMessage || 'Email is required';
        const emailMessage = field.validation.emailMessage || 'Please enter a valid email address';
        validation = z.string({ required_error: requiredMessage })
          .min(1, { message: requiredMessage })
          .email({ message: emailMessage });
      } else {
        validation = z.string().email(field.validation.emailMessage || 'Please enter a valid email address').optional();
      }
      break;

    case 'date':
      if (field.required) {
        const errorMessage = field.validation.requiredMessage || 'Date is required';
        validation = z.string({ required_error: errorMessage })
          .min(1, { message: errorMessage });
      } else {
        validation = z.string().optional();
      }
      
      // Add date format validation
      if (field.validation.dateFormat) {
        validation = validation.refine((date: string) => {
          if (!date) return !field.required;
          // Basic date format validation
          const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
          return dateRegex.test(date);
        }, field.validation.dateFormatMessage || 'Please enter date in MM/DD/YYYY format');
      }

      // Add age validation
      if (field.validation.minAge) {
        validation = validation.refine((date: string) => {
          if (!date) return !field.required;
          return validateAge(date, field.validation.minAge!);
        }, field.validation.minAgeMessage || `You must be at least ${field.validation.minAge} years old`);
      }

      // Add max date validation
      if (field.validation.maxDate) {
        validation = validation.refine((date: string) => {
          if (!date) return !field.required;
          const inputDate = new Date(date);
          const maxDate = new Date(field.validation.maxDate!);
          return inputDate <= maxDate;
        }, 'Date cannot be in the future');
      }
      break;

    case 'postal':
      if (field.required) {
        const errorMessage = field.validation.requiredMessage || 'Postal code is required';
        validation = z.string({ required_error: errorMessage })
          .min(1, { message: errorMessage });
      } else {
        validation = z.string().optional();
      }
      
      if (field.validation.postalFormat === 'CA') {
        validation = validation.refine((postal: string) => {
          if (!postal) return !field.required;
          return validateCanadianPostalCode(postal);
        }, 'Please enter a valid Canadian postal code');
      }
      break;

    case 'file':
      validation = z.any();
      
      if (field.required) {
        validation = validation.refine((file: File | FileList) => {
          return file && (file instanceof File || file instanceof FileList);
        }, field.validation.requiredMessage || 'File is required');
      }

      // File size validation
      if (field.validation.maxFileSize) {
        validation = validation.refine((file: File | FileList) => {
          if (!file) return !field.required;
          const fileObj = file instanceof FileList ? file[0] : file;
          return fileObj.size <= (field.validation.maxFileSize! * 1024 * 1024);
        }, field.validation.fileSizeMessage || `File size must be less than ${field.validation.maxFileSize}MB`);
      }

      // File type validation
      if (field.validation.fileTypes && field.validation.fileTypes.length > 0) {
        validation = validation.refine((file: File | FileList) => {
          if (!file) return !field.required;
          const fileObj = file instanceof FileList ? file[0] : file;
          return isValidFileType(fileObj.name, field.validation.fileTypes!);
        }, field.validation.fileTypeMessage || `Only ${field.validation.fileTypes?.join(', ')} files are allowed`);
      }

      if (!field.required) {
        validation = validation.optional();
      }
      break;

    case 'checkbox':
      if (field.required) {
        const errorMessage = field.validation.requiredMessage || 'This field is required';
        validation = z.boolean({ required_error: errorMessage, invalid_type_error: errorMessage })
          .refine((checked) => checked === true, errorMessage);
      } else {
        validation = z.boolean().optional().default(false);
      }
      break;

    case 'dropdown':
      if (field.required) {
        const errorMessage = field.validation.requiredMessage || 'Please select an option';
        validation = z.string({ required_error: errorMessage })
          .min(1, { message: errorMessage });
      } else {
        validation = z.string().optional();
      }
      
      // Validate against available options
      if (field.options && field.options.length > 0) {
        const validValues = field.options.map(option => option.value);
        validation = validation.refine((value: string) => {
          if (!value) return !field.required;
          return validValues.includes(value);
        }, 'Please select a valid option');
      }
      break;

    case 'terms':
      if (field.mode === 'checkbox') {
        if (field.required) {
          const errorMessage = field.validation.requiredMessage || 'You must accept the terms and conditions';
          validation = z.boolean({ required_error: errorMessage, invalid_type_error: errorMessage })
            .refine((accepted) => accepted === true, errorMessage);
        } else {
          validation = z.boolean().optional().default(false);
        }
      } else {
        // Text mode terms don't require validation
        validation = z.any().optional();
      }
      break;

    default:
      validation = z.string().optional();
  }

  return validation;
}

export function createFormValidationSchema(schema: FormSchema): z.ZodSchema<any> {
  const shape: Record<string, z.ZodTypeAny> = {};

  schema.fields.forEach((field) => {
    if (field.name && field.name.trim()) {
      shape[field.name] = createFieldValidation(field);
    }
  });

  return z.object(shape);
}

export type FormValidationSchema = z.infer<ReturnType<typeof createFormValidationSchema>>;
