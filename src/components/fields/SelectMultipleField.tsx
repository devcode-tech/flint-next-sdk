"use client";

import React from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";

export function SelectMultipleField({ field, value, onChange, error, className }: FormFieldProps) {
  const labelStyles = applyInlineStyles(field.style.label);
  const inputStyles = applyInlineStyles(field.style.input);

  const selectedValues = Array.isArray(value) ? value : [];

  const handleToggle = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    onChange(newValues);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {field.label && (
        <label className="block text-sm font-medium" style={labelStyles}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={cn(
          "border rounded-md p-2 space-y-1 max-h-48 overflow-y-auto",
          error ? "border-red-500" : "border-gray-300"
        )}
        style={{
          borderRadius: inputStyles.borderRadius
        }}
      >
        {field.options?.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <div
              key={option.value}
              onClick={() => handleToggle(option.value)}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors",
                isSelected
                  ? "bg-blue-50 hover:bg-blue-100"
                  : "hover:bg-gray-50"
              )}
            >
              <span className={cn(
                "text-sm",
                isSelected ? "font-medium text-blue-700" : "text-gray-700"
              )}>
                {option.label}
              </span>
              {isSelected && (
                <CheckIcon className="h-4 w-4 text-blue-600" />
              )}
            </div>
          );
        })}
      </div>

      {selectedValues.length > 0 && (
        <p className="text-xs text-gray-500">
          {selectedValues.length} item{selectedValues.length !== 1 ? 's' : ''} selected
        </p>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}