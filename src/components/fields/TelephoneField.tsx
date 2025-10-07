"use client";

import React from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function TelephoneField({ field, value, onChange, onBlur, error, className }: FormFieldProps) {
  const inputStyles = applyInlineStyles(field.style.input);
  const labelStyles = applyInlineStyles(field.style.label);

  const formatPhoneNumber = (input: string) => {
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX for US numbers
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div className={cn("space-y-1", className)}>
      {field.label && (
        <label htmlFor={field.id} className="block text-sm font-medium" style={labelStyles}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type="tel"
        id={field.id}
        name={field.name}
        value={value || ""}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={field.placeholder || "(123) 456-7890"}
        maxLength={14}
        className={cn(
          "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          error ? "border-red-500" : "border-gray-300"
        )}
        style={inputStyles}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}