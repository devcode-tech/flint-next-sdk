import { z } from 'zod';
import { FormField, FormSchema } from '@/lib/types';
import {
	validateAge,
	validateCanadianPostalCode,
	isValidFileType,
} from '@/lib/utils';

export function createFieldValidation(field: FormField): z.ZodTypeAny {
	let validation: any;

	switch (field.type) {
		case 'text':
			if (field.required) {
				const errorMessage =
					field.validation?.requiredMessage || `${field.name} is required`;
				validation = z
					.string({ required_error: errorMessage })
					.min(1, { message: errorMessage });
			} else {
				validation = z.string().optional();
			}
			break;

		case 'email':
			if (field.required) {
				const requiredMessage =
					field.validation?.requiredMessage || 'Email is required';
				const emailMessage =
					field.validation?.emailMessage ||
					'Please enter a valid email address';
				validation = z
					.string({ required_error: requiredMessage })
					.min(1, { message: requiredMessage })
					.email({ message: emailMessage });
			} else {
				validation = z
					.string()
					.email(
						field.validation?.emailMessage ||
							'Please enter a valid email address'
					)
					.optional();
			}
			break;

		case 'date':
			validation = z.string().optional();
			if (field.required) {
				const errorMessage =
					field.validation?.requiredMessage || 'Date is required';
				validation = z
					.string({ required_error: errorMessage })
					.min(1, { message: errorMessage });
			}

			if (field.validation?.dateFormat) {
				const dateFormat = field.validation.dateFormat;
				const message =
					field.validation.dateFormatMessage ||
					'Please enter date in MM/DD/YYYY format';
				validation = validation.refine((date: string) => {
					if (!date) return true;
					const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
					return dateRegex.test(date);
				}, message);
			}

			if (field.validation?.minAge) {
				const minAge = field.validation.minAge;
				const message =
					field.validation.minAgeMessage ||
					`You must be at least ${minAge} years old`;
				validation = validation.refine((date: string) => {
					if (!date) return true;
					return validateAge(date, minAge);
				}, message);
			}

			if (field.validation?.maxDate) {
				const maxDate = new Date(field.validation.maxDate);
				validation = validation.refine((date: string) => {
					if (!date) return true;
					return new Date(date) <= maxDate;
				}, 'Date cannot be in the future');
			}
			break;

		case 'postal':
			validation = z.string().optional();
			if (field.required) {
				const errorMessage =
					field.validation?.requiredMessage || 'Postal code is required';
				validation = z
					.string({ required_error: errorMessage })
					.min(1, { message: errorMessage });
			}

			if (field.validation?.postalFormat === 'CA') {
				validation = validation.refine((postal: string) => {
					if (!postal) return true;
					return validateCanadianPostalCode(postal);
				}, 'Please enter a valid Canadian postal code');
			}
			break;

		case 'file':
			validation = z.any().optional();

			// This single refine handles all file validation logic
			validation = validation.refine(
				(value: File | FileList | string) => {
					// If value is a string, it's a URL from a completed upload. It's valid.
					if (typeof value === 'string' && value.startsWith('http')) {
						return true;
					}

					// If no value and not required, it's valid.
					if (!value && !field.required) {
						return true;
					}

					// If required but no value, it's invalid.
					if (field.required && !value) {
						return false;
					}

					// From here, value is a File or FileList
					const file = value as File | FileList;
					const fileObj = file instanceof FileList ? file[0] : file;

					if (!fileObj) {
						return field.required ? false : true;
					}

					// File size validation
					if (field.validation?.maxFileSize) {
						const maxSize = field.validation.maxFileSize * 1024 * 1024;
						if (fileObj.size > maxSize) return false;
					}

					// File type validation
					if (
						field.validation?.fileTypes &&
						field.validation.fileTypes.length > 0
					) {
						debugger;
						const fileExtension = fileObj.name.split('.').pop()?.toLowerCase();
						if (
							!fileExtension ||
							!field.validation.fileTypes.includes(fileExtension)
						) {
							return false;
						}
					}

					return true;
				},
				{
					// This message will be used if any of the checks above return false.
					// You can create more granular messages by using superRefine if needed.
					message:
						field.validation?.requiredMessage ||
						'Invalid file. Please check size and type requirements.',
				}
			);
			break;

		case 'checkbox':
			if (field.required) {
				const errorMessage =
					field.validation?.requiredMessage || 'This field is required';
				validation = z
					.boolean({
						required_error: errorMessage,
						invalid_type_error: errorMessage,
					})
					.refine(checked => checked === true, errorMessage);
			} else {
				validation = z.boolean().optional().default(false);
			}
			break;

		case 'dropdown':
			validation = z.string().optional();
			if (field.required) {
				const errorMessage =
					field.validation?.requiredMessage || 'Please select an option';
				validation = z
					.string({ required_error: errorMessage })
					.min(1, { message: errorMessage });
			}

			if (field.options && field.options.length > 0) {
				const validValues = field.options.map(option => option.value);
				validation = validation.refine((value: string) => {
					if (!value) return true;
					return validValues.includes(value);
				}, 'Please select a valid option');
			}
			break;

		case 'terms':
			if (field.mode === 'checkbox') {
				if (field.required) {
					const errorMessage =
						field.validation?.requiredMessage ||
						'You must accept the terms and conditions';
					validation = z
						.boolean({
							required_error: errorMessage,
							invalid_type_error: errorMessage,
						})
						.refine(accepted => accepted === true, errorMessage);
				} else {
					validation = z.boolean().optional().default(false);
				}
			} else {
				validation = z.any().optional();
			}
			break;

		default:
			validation = z.string().optional();
	}

	return validation;
}

export function createFormValidationSchema(
	schema: FormSchema
): z.ZodSchema<any> {
	const shape: Record<string, z.ZodTypeAny> = {};

	schema.fields.forEach(field => {
		if (field.name && field.name.trim()) {
			shape[field.name] = createFieldValidation(field);
		}
	});

	return z.object(shape);
}

export type FormValidationSchema = z.infer<
	ReturnType<typeof createFormValidationSchema>
>;
