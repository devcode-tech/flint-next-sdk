import { z } from "zod";
import { validateAge, validateCanadianPostalCode, isValidFileType } from "@/lib/utils";
export function createFieldValidation(field) {
    var _a;
    let validation;
    switch (field.type) {
        case 'text':
            if (field.required) {
                const errorMessage = field.validation.requiredMessage || `${field.name} is required`;
                validation = z.string({ required_error: errorMessage })
                    .min(1, { message: errorMessage });
            }
            else {
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
            }
            else {
                validation = z.string().email(field.validation.emailMessage || 'Please enter a valid email address').optional();
            }
            break;
        case 'date':
            if (field.required) {
                const errorMessage = field.validation.requiredMessage || 'Date is required';
                validation = z.string({ required_error: errorMessage })
                    .min(1, { message: errorMessage });
            }
            else {
                validation = z.string().optional();
            }
            if (field.validation.dateFormat) {
                validation = validation.refine((date) => {
                    if (!date)
                        return !field.required;
                    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
                    return dateRegex.test(date);
                }, field.validation.dateFormatMessage || 'Please enter date in MM/DD/YYYY format');
            }
            if (field.validation.minAge) {
                validation = validation.refine((date) => {
                    if (!date)
                        return !field.required;
                    return validateAge(date, field.validation.minAge);
                }, field.validation.minAgeMessage || `You must be at least ${field.validation.minAge} years old`);
            }
            if (field.validation.maxDate) {
                validation = validation.refine((date) => {
                    if (!date)
                        return !field.required;
                    const inputDate = new Date(date);
                    const maxDate = new Date(field.validation.maxDate);
                    return inputDate <= maxDate;
                }, 'Date cannot be in the future');
            }
            break;
        case 'postal':
            if (field.required) {
                const errorMessage = field.validation.requiredMessage || 'Postal code is required';
                validation = z.string({ required_error: errorMessage })
                    .min(1, { message: errorMessage });
            }
            else {
                validation = z.string().optional();
            }
            if (field.validation.postalFormat === 'CA') {
                validation = validation.refine((postal) => {
                    if (!postal)
                        return !field.required;
                    return validateCanadianPostalCode(postal);
                }, 'Please enter a valid Canadian postal code');
            }
            break;
        case 'file':
            validation = z.any();
            if (field.required) {
                validation = validation.refine((file) => {
                    return file && (file instanceof File || file instanceof FileList);
                }, field.validation.requiredMessage || 'File is required');
            }
            if (field.validation.maxFileSize) {
                validation = validation.refine((file) => {
                    if (!file)
                        return !field.required;
                    const fileObj = file instanceof FileList ? file[0] : file;
                    return fileObj.size <= (field.validation.maxFileSize * 1024 * 1024);
                }, field.validation.fileSizeMessage || `File size must be less than ${field.validation.maxFileSize}MB`);
            }
            if (field.validation.fileTypes && field.validation.fileTypes.length > 0) {
                validation = validation.refine((file) => {
                    if (!file)
                        return !field.required;
                    const fileObj = file instanceof FileList ? file[0] : file;
                    return isValidFileType(fileObj.name, field.validation.fileTypes);
                }, field.validation.fileTypeMessage || `Only ${(_a = field.validation.fileTypes) === null || _a === void 0 ? void 0 : _a.join(', ')} files are allowed`);
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
            }
            else {
                validation = z.boolean().optional().default(false);
            }
            break;
        case 'dropdown':
            if (field.required) {
                const errorMessage = field.validation.requiredMessage || 'Please select an option';
                validation = z.string({ required_error: errorMessage })
                    .min(1, { message: errorMessage });
            }
            else {
                validation = z.string().optional();
            }
            if (field.options && field.options.length > 0) {
                const validValues = field.options.map(option => option.value);
                validation = validation.refine((value) => {
                    if (!value)
                        return !field.required;
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
                }
                else {
                    validation = z.boolean().optional().default(false);
                }
            }
            else {
                validation = z.any().optional();
            }
            break;
        default:
            validation = z.string().optional();
    }
    return validation;
}
export function createFormValidationSchema(schema) {
    const shape = {};
    schema.fields.forEach((field) => {
        if (field.name && field.name.trim()) {
            shape[field.name] = createFieldValidation(field);
        }
    });
    return z.object(shape);
}
//# sourceMappingURL=validation.js.map