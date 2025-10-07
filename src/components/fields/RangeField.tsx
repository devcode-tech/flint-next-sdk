"use client";

import React from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function RangeField({ field, value, onChange, onBlur, error, className }: FormFieldProps) {
  const inputStyles = applyInlineStyles(field.style.input);
  const labelStyles = applyInlineStyles(field.style.label);

  const min = field.validation?.min || 0;
  const max = field.validation?.max || 100;
  const step = field.validation?.step || 1;

  return (
    <div className={cn("space-y-1", className)}>
      {field.label && (
        <label htmlFor={field.id} className="block text-sm font-medium" style={labelStyles}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-2">
        <input
          type="range"
          id={field.id}
          name={field.name}
          value={value || min}
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={onBlur}
          min={min}
          max={max}
          step={step}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          style={{
            accentColor: inputStyles.borderColor || '#3b82f6'
          }}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{min}</span>
          <span className="font-medium text-gray-700">{value || min}</span>
          <span>{max}</span>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}