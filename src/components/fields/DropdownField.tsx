"use client";

import React, { useState, useMemo } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function DropdownField({ field, value, onChange, error, className }: FormFieldProps) {
  const inputStyles = applyInlineStyles(field.style.input);
  const labelStyles = applyInlineStyles(field.style.label);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) {
      return field.options || [];
    }
    
    return (field.options || []).filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [field.options, searchQuery]);

  // Get selected option label
  const selectedOption = field.options?.find((opt) => opt.value === value);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset search when dropdown closes
      setSearchQuery("");
    }
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
      
      <Select.Root value={value || ""} onValueChange={onChange} onOpenChange={handleOpenChange}>
        <Select.Trigger
          className={cn(
            "flex w-full items-center justify-between rounded border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500" : "border-gray-300"
          )}
          style={inputStyles}
        >
          <Select.Value placeholder={field.placeholder}>
            {selectedOption?.label || field.placeholder}
          </Select.Value>
          <Select.Icon className="h-4 w-4 opacity-50">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        
        <Select.Portal>
          <Select.Content
            className="relative z-50 min-w-[var(--radix-select-trigger-width)] max-h-96 overflow-hidden rounded-md border bg-white text-gray-950 shadow-lg animate-in fade-in-80"
            position="popper"
            sideOffset={4}
          >
            {/* Search Input */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search options..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1 bg-white">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            
            <Select.Viewport className="p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Select.Item
                    key={option.id}
                    value={option.value}
                    className="relative flex cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm outline-none focus:bg-blue-50 data-[state=checked]:bg-blue-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))
              ) : (
                <div className="py-6 text-center text-sm text-gray-500">
                  No options found
                </div>
              )}
            </Select.Viewport>
            
            <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1 bg-white">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
