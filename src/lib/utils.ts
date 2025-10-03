import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormFieldValidation, FormFieldStyle } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function applyInlineStyles(
  style: FormFieldStyle['input'] | FormFieldStyle['label'] | Record<string, any>
): React.CSSProperties {
  if (!style) return {};
  
  const cssProperties: React.CSSProperties = {};
  
  Object.entries(style).forEach(([key, value]) => {
    if (value === undefined) return;
    // Convert kebab-case to camelCase for React CSS properties
    const camelKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    (cssProperties as any)[camelKey] = value;
  });
  
  return cssProperties;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isValidFileType(fileName: string, allowedTypes: string[]): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  return allowedTypes.map(type => type.toLowerCase()).includes(extension);
}

export function validateAge(dateString: string, minAge: number): boolean {
  const birthDate = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= minAge;
  }
  
  return age >= minAge;
}

export function validateCanadianPostalCode(postalCode: string): boolean {
  const canadianPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return canadianPostalRegex.test(postalCode);
}

export function formatDate(date: string, format: string): string {
  const d = new Date(date);
  
  if (format === 'MM/DD/YYYY') {
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  }
  
  return date;
}

export function parseFormData(formData: Record<string, any>) {
  const parsed: Record<string, any> = {};
  
  Object.entries(formData).forEach(([key, value]) => {
    // Handle file uploads
    if (value instanceof File || value instanceof FileList) {
      parsed[key] = value;
    }
    // Handle checkbox arrays
    else if (Array.isArray(value)) {
      parsed[key] = value;
    }
    // Handle regular values
    else {
      parsed[key] = value;
    }
  });
  
  return parsed;
}
