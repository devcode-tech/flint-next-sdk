"use client";

import React, { useRef } from "react";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles, formatFileSize } from "@/lib/utils";
import { UploadIcon, FileIcon, TrashIcon } from "@radix-ui/react-icons";

export function FileField({ field, value, onChange, error, className }: FormFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputStyles = applyInlineStyles(field.style.input);
  const labelStyles = applyInlineStyles(field.style.label);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(file);
  };

  const handleRemoveFile = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const acceptedTypes = field.validation.fileTypes?.map(type => `.${type}`).join(",");

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
      
      <div>
        <input
          ref={inputRef}
          id={field.id}
          name={field.name}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {!value ? (
          <>
            <div
              className={cn(
                "flex items-center w-full border-2 rounded cursor-pointer hover:bg-gray-100 transition-colors py-3 px-4",
                error ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
              )}
              style={{
                ...inputStyles,
                borderColor: error ? '#ef4444' : inputStyles.borderColor || '#d1d5db',
                borderStyle: 'solid',
                borderWidth: inputStyles.borderWidth || '2px',
                borderRadius: inputStyles.borderRadius || '8px',
                backgroundColor: error ? '#fef2f2' : inputStyles.backgroundColor || '#f9fafb'
              }}
              onClick={() => inputRef.current?.click()}
            >
              {/* Upload Icon */}
              <UploadIcon className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
              
              {/* Placeholder Text */}
              <p className="text-sm font-medium text-gray-700">
                {field.placeholder || "Upload Receipt Image"}
              </p>
            </div>
            
            {/* Helper Text - File Types and Size - Outside the box with mt-1 */}
            {(field.validation.fileTypes || field.validation.maxFileSize) && (
              <div className="text-xs text-gray-500 mt-1 px-1">
                {field.validation.fileTypes && (
                  <p className="leading-relaxed">
                    Supported formats: {field.validation.fileTypes.map(type => type.toUpperCase()).join(", ")}
                  </p>
                )}
                {field.validation.maxFileSize && (
                  <p className={cn(field.validation.fileTypes && "mt-0.5")}>
                    Maximum file size: {field.validation.maxFileSize}MB
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-300"
            style={{
              borderRadius: inputStyles.borderRadius || '8px'
            }}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <FileIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{value.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(value.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 p-1 flex-shrink-0 ml-2 transition-colors"
              aria-label="Remove file"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
