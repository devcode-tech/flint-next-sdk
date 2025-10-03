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
      
      <div className="space-y-2">
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
          <div
            className={cn(
              "flex flex-col items-center justify-center w-full border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors",
              error ? "border-red-500" : "border-gray-300"
            )}
            style={{
              ...inputStyles,
              minHeight: inputStyles.height || '120px',
              padding: '20px',
              borderColor: error ? '#ef4444' : inputStyles.borderColor || '#d1d5db',
              borderWidth: inputStyles.borderWidth || '2px',
              borderRadius: inputStyles.borderRadius || '4px'
            }}
            onClick={() => inputRef.current?.click()}
          >
            <div className="flex items-center justify-center text-center">
              {/* <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Click to upload</span>
              </p> */}
              <p className="text-xs text-gray-500">{field.placeholder}</p>
              <UploadIcon className="w-6 h-6 mb-2 text-gray-400" />
            </div>
            {field.validation.fileTypes && (
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: {field.validation.fileTypes.join(", ").toUpperCase()}
                </p>
              )}
              {field.validation.maxFileSize && (
                <p className="text-xs text-gray-500">
                  Max size: {field.validation.maxFileSize}MB
                </p>
              )}
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
            <div className="flex items-center space-x-3">
              <FileIcon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{value.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(value.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 p-1"
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
