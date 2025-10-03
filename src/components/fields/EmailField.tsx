"use client";

import React from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function EmailField({ field, value, onChange, onBlur, error, className }: FormFieldProps) {
  const inputStyles = applyInlineStyles(field.style.input);
  const labelStyles = applyInlineStyles(field.style.label);

  return (
    <div className={cn("space-y-1", className)}>
      {field.label && (
        <label 
          htmlFor={field.id}
          className="block text-sm font-medium"
          style={labelStyles}
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={field.id}
        name={field.name}
        type="email"
        placeholder={field.placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(
          "w-full border rounded focus:outline-none focus:ring-0",
          error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
        )}
        style={inputStyles}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
