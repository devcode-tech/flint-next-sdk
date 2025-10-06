"use client";

import React from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function TextareaField({ field, value, onChange, onBlur, error, className }: FormFieldProps) {
  const inputStyles = applyInlineStyles(field.style.input);
  const labelStyles = applyInlineStyles(field.style.label);

  const rows = field.validation?.minLength ? Math.max(4, Math.ceil(field.validation.minLength / 50)) : 4;

  return (
    <div className={cn("space-y-1", className)}>
      {field.label && (
        <label htmlFor={field.id} className="block text-sm font-medium" style={labelStyles}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={field.id}
        name={field.name}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={field.placeholder}
        rows={rows}
        maxLength={field.validation?.maxLength}
        className={cn(
          "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y",
          error ? "border-red-500" : "border-gray-300"
        )}
        style={inputStyles}
      />

      {field.validation?.maxLength && (
        <p className="text-xs text-gray-500 text-right">
          {value?.length || 0} / {field.validation.maxLength}
        </p>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}