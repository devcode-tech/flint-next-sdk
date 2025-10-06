"use client";

import React from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function RadioField({ field, value, onChange, error, className }: FormFieldProps) {
  const labelStyles = applyInlineStyles(field.style.label);
  const inputStyles = applyInlineStyles(field.style.input);

  const handleChange = (optionValue: string) => {
    onChange(optionValue);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {field.label && (
        <label className="block text-sm font-medium" style={labelStyles}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-2">
        {field.options?.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${field.id}-${option.value}`}
              name={field.name}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              className={cn(
                "h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-500",
                error ? "border-red-500" : ""
              )}
              style={{
                accentColor: inputStyles.borderColor || '#3b82f6'
              }}
            />
            <label
              htmlFor={`${field.id}-${option.value}`}
              className="ml-3 text-sm text-gray-700 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}