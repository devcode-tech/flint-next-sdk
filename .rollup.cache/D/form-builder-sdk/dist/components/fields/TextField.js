"use client";
import React from "react";
import { cn, applyInlineStyles } from "@/lib/utils";
export function TextField({ field, value, onChange, onBlur, error, className }) {
    const inputStyles = applyInlineStyles(field.style.input);
    const labelStyles = applyInlineStyles(field.style.label);
    return (React.createElement("div", { className: cn("space-y-1", className) },
        field.label && (React.createElement("label", { htmlFor: field.id, className: "block text-sm font-medium", style: labelStyles },
            field.label,
            field.required && React.createElement("span", { className: "text-red-500 ml-1" }, "*"))),
        React.createElement("input", { id: field.id, name: field.name, type: "text", placeholder: field.placeholder, value: value || "", onChange: (e) => onChange(e.target.value), onBlur: onBlur, className: cn("w-full border rounded focus:outline-none focus:ring-0", error ? "border-red-500" : "border-gray-300 focus:border-blue-500"), style: Object.assign({}, inputStyles) }),
        error && (React.createElement("p", { className: "text-sm text-red-500 mt-1" }, error))));
}
//# sourceMappingURL=TextField.js.map