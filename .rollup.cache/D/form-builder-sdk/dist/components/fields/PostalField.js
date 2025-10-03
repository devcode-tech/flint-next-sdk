"use client";
import React from "react";
import { cn, applyInlineStyles } from "@/lib/utils";
export function PostalField({ field, value, onChange, onBlur, error, className }) {
    const inputStyles = applyInlineStyles(field.style.input);
    const labelStyles = applyInlineStyles(field.style.label);
    const handleInputChange = (e) => {
        let inputValue = e.target.value.toUpperCase();
        if (field.validation.postalFormat === "CA") {
            inputValue = inputValue.replace(/[^A-Z0-9]/g, "");
            if (inputValue.length > 3) {
                inputValue = inputValue.slice(0, 3) + " " + inputValue.slice(3, 6);
            }
            inputValue = inputValue.slice(0, 7);
        }
        onChange(inputValue);
    };
    return (React.createElement("div", { className: cn("space-y-1", className) },
        field.label && (React.createElement("label", { htmlFor: field.id, className: "block text-sm font-medium", style: labelStyles },
            field.label,
            field.required && React.createElement("span", { className: "text-red-500 ml-1" }, "*"))),
        React.createElement("input", { id: field.id, name: field.name, type: "text", placeholder: field.placeholder, value: value || "", onChange: handleInputChange, onBlur: onBlur, maxLength: field.validation.postalFormat === "CA" ? 7 : undefined, className: cn("w-full border rounded focus:outline-none focus:ring-0", error ? "border-red-500" : "border-gray-300 focus:border-blue-500"), style: inputStyles }),
        field.validation.postalFormat === "CA" && (React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "Format: A1A 1A1")),
        error && (React.createElement("p", { className: "text-sm text-red-500 mt-1" }, error))));
}
//# sourceMappingURL=PostalField.js.map