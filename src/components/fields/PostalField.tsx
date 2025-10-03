"use client";

import React from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function PostalField({ field, value, onChange, onBlur, error, className }: FormFieldProps) {
  const inputStyles = applyInlineStyles(field.style.input);
  const labelStyles = applyInlineStyles(field.style.label);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.toUpperCase();
    
    // Format Canadian postal code (A1A 1A1)
    if (field.validation.postalFormat === "CA") {
      // Remove spaces and non-alphanumeric characters
      inputValue = inputValue.replace(/[^A-Z0-9]/g, "");
      
      // Add space after third character
      if (inputValue.length > 3) {
        inputValue = inputValue.slice(0, 3) + " " + inputValue.slice(3, 6);
      }
      
      // Limit to 7 characters (including space)
      inputValue = inputValue.slice(0, 7);
    }
    
    onChange(inputValue);
  };

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
        type="text"
        placeholder={field.placeholder}
        value={value || ""}
        onChange={handleInputChange}
        onBlur={onBlur}
        maxLength={field.validation.postalFormat === "CA" ? 7 : undefined}
        className={cn(
          "w-full border rounded focus:outline-none focus:ring-0",
          error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
        )}
        style={inputStyles}
      />
      {field.validation.postalFormat === "CA" && (
        <p className="text-xs text-gray-500 mt-1">Format: A1A 1A1</p>
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
