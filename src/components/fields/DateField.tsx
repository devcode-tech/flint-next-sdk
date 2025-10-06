"use client";

import React, { useRef } from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles, formatDate } from "@/lib/utils";

export function DateField({ field, value, onChange, onBlur, error, className }: FormFieldProps) {
  const inputStyles = applyInlineStyles(field.style.input);
  const labelStyles = applyInlineStyles(field.style.label);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value; // This is in YYYY-MM-DD format from the input
    
    // Always format the date according to the schema's dateFormat
    if (field.dateFormat && dateValue) {
      const [year, month, day] = dateValue.split('-');
      const formattedDate = formatDateByPattern(year, month, day, field.dateFormat);
      onChange(formattedDate);
    } else {
      onChange(dateValue);
    }
  };

  const formatDateByPattern = (year: string, month: string, day: string, pattern: string): string => {
    // Remove any separators and get the pattern parts
    const normalizedPattern = pattern.toUpperCase();
    let separator = '/';
    
    // Detect separator from pattern
    if (pattern.includes('-')) {
      separator = '-';
    } else if (pattern.includes('.')) {
      separator = '.';
    }
    
    // Build date string based on pattern
    if (normalizedPattern.startsWith('DD')) {
      if (normalizedPattern.includes('DD' + separator + 'MM')) {
        return `${day}${separator}${month}${separator}${year}`;
      }
    } else if (normalizedPattern.startsWith('MM')) {
      if (normalizedPattern.includes('MM' + separator + 'DD')) {
        return `${month}${separator}${day}${separator}${year}`;
      }
    } else if (normalizedPattern.startsWith('YYYY')) {
      if (normalizedPattern.includes('YYYY' + separator + 'MM' + separator + 'DD')) {
        return `${year}${separator}${month}${separator}${day}`;
      } else if (normalizedPattern.includes('YYYY' + separator + 'DD' + separator + 'MM')) {
        return `${year}${separator}${day}${separator}${month}`;
      }
    }
    
    // Default to DD/MM/YYYY
    return `${day}${separator}${month}${separator}${year}`;
  };

  const handleDisplayClick = () => {
    dateInputRef.current?.showPicker?.();
  };

  // Convert formatted date back to YYYY-MM-DD for the date input
  const getInputValue = () => {
    if (!value) return "";
    
    // If value is already in YYYY-MM-DD format, use it directly
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
    
    // Try to parse based on the field's dateFormat
    try {
      if (!field.dateFormat) return value;
      
      const format = field.dateFormat.toUpperCase();
      let day, month, year;
      
      // Determine separator from the value
      let separator = '/';
      if (value.includes('-')) {
        separator = '-';
      } else if (value.includes('.')) {
        separator = '.';
      } else if (!value.includes('/')) {
        return "";
      }
      
      const parts = value.split(separator);
      if (parts.length !== 3) return "";
      
      // Parse based on format pattern
      if (format.startsWith('DD')) {
        if (format.indexOf('MM') > format.indexOf('DD')) {
          // DD?MM?YYYY
          [day, month, year] = parts;
        }
      } else if (format.startsWith('MM')) {
        if (format.indexOf('DD') > format.indexOf('MM')) {
          // MM?DD?YYYY
          [month, day, year] = parts;
        }
      } else if (format.startsWith('YYYY')) {
        // Check second part
        const secondPart = format.substring(5, 7);
        if (secondPart === 'MM') {
          // YYYY?MM?DD
          [year, month, day] = parts;
        } else if (secondPart === 'DD') {
          // YYYY?DD?MM
          [year, day, month] = parts;
        }
      }
      
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "";
    }
  };

  // Ensure value is always a string
  const inputValue = value ?? '';

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
      <div className="relative">
        {/* Display field showing formatted date */}
        <div
          onClick={handleDisplayClick}
          className={cn(
            "w-full border rounded px-3 py-2 cursor-pointer bg-white",
            error ? "border-red-500" : "border-gray-300 focus-within:border-blue-500"
          )}
          style={inputStyles}
        >
          <span className={cn(
            "block",
            !inputValue && "text-gray-400"
          )}>
            {inputValue || field.placeholder || "Select a date"}
          </span>
        </div>
        
        {/* Hidden native date input */}
        <input
          ref={dateInputRef}
          id={field.id}
          name={field.name}
          type="date"
          value={getInputValue()}
          onChange={handleDateChange}
          onBlur={onBlur}
          max={field.validation.maxDate}
          className="absolute opacity-0 pointer-events-none"
          tabIndex={-1}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
