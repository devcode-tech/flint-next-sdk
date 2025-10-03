"use client";

import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { FormFieldProps } from "@/lib/types";
import { cn, applyInlineStyles } from "@/lib/utils";

export function TermsField({ field, value, onChange, error, className }: FormFieldProps) {
  const labelStyles = applyInlineStyles(field.style.label);

  // Parse content with links
  const parseContentWithLinks = (content: string, links: typeof field.links) => {
    if (!links || links.length === 0) {
      return <span>{content}</span>;
    }

    let parsedContent = content;
    const elements: (string | React.ReactElement)[] = [];
    let lastIndex = 0;

    links.forEach((link, index) => {
      const linkIndex = parsedContent.indexOf(link.text, lastIndex);
      if (linkIndex !== -1) {
        // Add text before link
        if (linkIndex > lastIndex) {
          elements.push(parsedContent.substring(lastIndex, linkIndex));
        }
        
        // Add link element
        elements.push(
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {link.text}
          </a>
        );
        
        lastIndex = linkIndex + link.text.length;
      }
    });

    // Add remaining text
    if (lastIndex < parsedContent.length) {
      elements.push(parsedContent.substring(lastIndex));
    }

    return elements;
  };

  if (field.mode === "text") {
    // Text-only terms (no interaction required)
    return (
      <div className={cn("space-y-2", className)}>
        <div 
          className="text-sm text-gray-700"
          style={labelStyles}
        >
          {parseContentWithLinks(field.content || "", field.links)}
        </div>
      </div>
    );
  }

  // Checkbox mode (requires user agreement)
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-start space-x-3">
        <Checkbox.Root
          id={field.id}
          checked={value || false}
          onCheckedChange={onChange}
          className={cn(
            "flex h-5 w-5 items-center justify-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-0.5",
            error && "focus:ring-red-500"
          )}
          style={{
            backgroundColor: value ? '#374151' : '#ffffff',
            borderColor: '#374151',
            borderWidth: '2px',
            borderRadius: '4px',
            borderStyle: 'solid',
            minWidth: '20px',
            minHeight: '20px'
          }}
        >
          <Checkbox.Indicator className="text-white">
            <CheckIcon className="h-4 w-4" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        
        <label 
          htmlFor={field.id}
          className="cursor-pointer flex-1 select-none text-sm leading-relaxed"
          style={{
            fontSize: '14px',
            color: '#111827',
            lineHeight: '1.6'
          }}
        >
          {parseContentWithLinks(field.content || "", field.links)}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
