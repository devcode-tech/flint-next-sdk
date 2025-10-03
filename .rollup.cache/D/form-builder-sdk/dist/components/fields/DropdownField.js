"use client";
import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { cn, applyInlineStyles } from "@/lib/utils";
export function DropdownField({ field, value, onChange, error, className }) {
    var _a;
    const inputStyles = applyInlineStyles(field.style.input);
    const labelStyles = applyInlineStyles(field.style.label);
    return (React.createElement("div", { className: cn("space-y-1", className) },
        field.label && (React.createElement("label", { htmlFor: field.id, className: "block text-sm font-medium", style: labelStyles },
            field.label,
            field.required && React.createElement("span", { className: "text-red-500 ml-1" }, "*"))),
        React.createElement(Select.Root, { value: value || "", onValueChange: onChange },
            React.createElement(Select.Trigger, { className: cn("flex w-full items-center justify-between rounded border bg-white text-sm focus:outline-none focus:ring-0", error ? "border-red-500" : "border-gray-300 focus:border-blue-500"), style: inputStyles },
                React.createElement(Select.Value, { placeholder: field.placeholder }),
                React.createElement(Select.Icon, { className: "h-4 w-4 opacity-50 mr-2" },
                    React.createElement(ChevronDownIcon, null))),
            React.createElement(Select.Portal, null,
                React.createElement(Select.Content, { className: "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-950 shadow-md animate-in fade-in-80", position: "popper", sideOffset: 4 },
                    React.createElement(Select.ScrollUpButton, { className: "flex cursor-default items-center justify-center py-1" },
                        React.createElement(ChevronUpIcon, null)),
                    React.createElement(Select.Viewport, { className: "p-1" }, (_a = field.options) === null || _a === void 0 ? void 0 : _a.map((option) => (React.createElement(Select.Item, { key: option.id, value: option.value, className: "relative flex cursor-default select-none items-center rounded-sm py-2 px-3 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50" },
                        React.createElement(Select.ItemText, null, option.label))))),
                    React.createElement(Select.ScrollDownButton, { className: "flex cursor-default items-center justify-center py-1" },
                        React.createElement(ChevronDownIcon, null))))),
        error && (React.createElement("p", { className: "text-sm text-red-500 mt-1" }, error))));
}
//# sourceMappingURL=DropdownField.js.map