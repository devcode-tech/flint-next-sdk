"use client";

import React from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function ColorField({ field, value, onChange, onBlur, error, className }: FormFieldProps) {
  const labelStyles = applyInlineStyles(field.style.label);

  return (
    <div className={cn("space-y-1", className)}>
      {field.label && (
        <label htmlFor={field.id} className="block text-sm font-medium" style={labelStyles}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex items-center gap-3">
        <input
          type="color"
          id={field.id}
          name={field.name}
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={cn(
            "h-10 w-20 border rounded cursor-pointer",
            error ? "border-red-500" : "border-gray-300"
          )}
        />
        <input
          type="text"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className={cn(
            "flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500" : "border-gray-300"
          )}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}