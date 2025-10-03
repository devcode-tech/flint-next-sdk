"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function DropdownField({ field, value, onChange, error, className }: FormFieldProps) {
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
      
      <Select.Root value={value || ""} onValueChange={onChange}>
        <Select.Trigger
          className={cn(
            "flex w-full items-center justify-between rounded border bg-white text-sm focus:outline-none focus:ring-0",
            error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
          )}
          style={inputStyles}
        >
          <Select.Value placeholder={field.placeholder} />
          <Select.Icon className="h-4 w-4 opacity-50 mr-2">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        
        <Select.Portal>
          <Select.Content
            className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-950 shadow-md animate-in fade-in-80"
            position="popper"
            sideOffset={4}
          >
            <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            
            <Select.Viewport className="p-1">
              {field.options?.map((option) => (
                <Select.Item
                  key={option.id}
                  value={option.value}
                  className="relative flex cursor-default select-none items-center rounded-sm py-2 px-3 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            
            <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
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
