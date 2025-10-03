import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function applyInlineStyles(style) {
    if (!style)
        return {};
    const cssProperties = {};
    Object.entries(style).forEach(([key, value]) => {
        if (value === undefined)
            return;
        const camelKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        cssProperties[camelKey] = value;
    });
    return cssProperties;
}
export function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
export function isValidFileType(fileName, allowedTypes) {
    var _a;
    const extension = ((_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
    return allowedTypes.map(type => type.toLowerCase()).includes(extension);
}
export function validateAge(dateString, minAge) {
    const birthDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= minAge;
    }
    return age >= minAge;
}
export function validateCanadianPostalCode(postalCode) {
    const canadianPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return canadianPostalRegex.test(postalCode);
}
export function formatDate(date, format) {
    const d = new Date(date);
    if (format === 'MM/DD/YYYY') {
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    }
    return date;
}
export function parseFormData(formData) {
    const parsed = {};
    Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File || value instanceof FileList) {
            parsed[key] = value;
        }
        else if (Array.isArray(value)) {
            parsed[key] = value;
        }
        else {
            parsed[key] = value;
        }
    });
    return parsed;
}
//# sourceMappingURL=utils.js.map