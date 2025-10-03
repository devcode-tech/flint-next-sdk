// Main SDK exports
export { DynamicForm } from "@/components/DynamicForm";

// Field components
export {
  TextField,
  EmailField,
  DateField,
  PostalField,
  FileField,
  CheckboxField,
  DropdownField,
  TermsField
} from "@/components/fields";

// Types
export type {
  FormSchema,
  FormField,
  FormFieldType,
  FormFieldProps,
  FormFieldValidation,
  FormFieldOption,
  FormFieldLink,
  FormFieldStyle,
  FormSubmitButton,
  FormDesign,
  FormData
} from "@/lib/types";

// Validation utilities
export {
  createFormValidationSchema,
  createFieldValidation
} from "@/lib/validation";

// Utility functions
export {
  cn,
  applyInlineStyles,
  formatFileSize,
  isValidFileType,
  validateAge,
  validateCanadianPostalCode,
  formatDate,
  parseFormData
} from "@/lib/utils";
