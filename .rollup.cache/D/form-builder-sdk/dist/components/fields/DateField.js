"use client";
import React from "react";
import { cn, applyInlineStyles, formatDate } from "@/lib/utils";
export function DateField({ field, value, onChange, onBlur, error, className }) {
    const inputStyles = applyInlineStyles(field.style.input);
    const labelStyles = applyInlineStyles(field.style.label);
    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        if (field.dateFormat === "MM/DD/YYYY" && dateValue) {
            const formattedDate = formatDate(dateValue, field.dateFormat);
            onChange(formattedDate);
        }
        else {
            onChange(dateValue);
        }
    };
    const getInputValue = () => {
        if (!value)
            return "";
        if (field.dateFormat === "MM/DD/YYYY" && value.includes("/")) {
            const [month, day, year] = value.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
        return value;
    };
    return (React.createElement("div", { className: cn("space-y-1", className) },
        field.label && (React.createElement("label", { htmlFor: field.id, className: "block text-sm font-medium", style: labelStyles },
            field.label,
            field.required && React.createElement("span", { className: "text-red-500 ml-1" }, "*"))),
        React.createElement("input", { id: field.id, name: field.name, type: "date", placeholder: field.placeholder, value: getInputValue(), onChange: handleDateChange, onBlur: onBlur, max: field.validation.maxDate, className: cn("w-full border rounded focus:outline-none focus:ring-0", error ? "border-red-500" : "border-gray-300 focus:border-blue-500"), style: inputStyles }),
        error && (React.createElement("p", { className: "text-sm text-red-500 mt-1" }, error))));
}
//# sourceMappingURL=DateField.js.map