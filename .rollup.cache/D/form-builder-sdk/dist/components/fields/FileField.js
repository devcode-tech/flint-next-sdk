"use client";
import React, { useRef } from "react";
import { cn, applyInlineStyles, formatFileSize } from "@/lib/utils";
import { UploadIcon, FileIcon, TrashIcon } from "@radix-ui/react-icons";
export function FileField({ field, value, onChange, error, className }) {
    var _a;
    const inputRef = useRef(null);
    const inputStyles = applyInlineStyles(field.style.input);
    const labelStyles = applyInlineStyles(field.style.label);
    const handleFileSelect = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        onChange(file);
    };
    const handleRemoveFile = () => {
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };
    const acceptedTypes = (_a = field.validation.fileTypes) === null || _a === void 0 ? void 0 : _a.map(type => `.${type}`).join(",");
    return (React.createElement("div", { className: cn("space-y-1", className) },
        field.label && (React.createElement("label", { htmlFor: field.id, className: "block text-sm font-medium", style: labelStyles },
            field.label,
            field.required && React.createElement("span", { className: "text-red-500 ml-1" }, "*"))),
        React.createElement("div", { className: "space-y-2" },
            React.createElement("input", { ref: inputRef, id: field.id, name: field.name, type: "file", accept: acceptedTypes, onChange: handleFileSelect, className: "hidden" }),
            !value ? (React.createElement("div", { className: cn("flex flex-col items-center justify-center w-full border-2 border-dashed rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors", error ? "border-red-500" : "border-gray-300"), style: Object.assign(Object.assign({}, inputStyles), { minHeight: inputStyles.height || '120px', padding: '20px', borderColor: error ? '#ef4444' : inputStyles.borderColor || '#d1d5db', borderWidth: inputStyles.borderWidth || '2px', borderRadius: inputStyles.borderRadius || '4px' }), onClick: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click(); } },
                React.createElement("div", { className: "flex items-center justify-center text-center" },
                    React.createElement("p", { className: "text-xs text-gray-500" }, field.placeholder),
                    React.createElement(UploadIcon, { className: "w-6 h-6 mb-2 text-gray-400" })),
                field.validation.fileTypes && (React.createElement("p", { className: "text-xs text-gray-500 mt-1" },
                    "Supported formats: ",
                    field.validation.fileTypes.join(", ").toUpperCase())),
                field.validation.maxFileSize && (React.createElement("p", { className: "text-xs text-gray-500" },
                    "Max size: ",
                    field.validation.maxFileSize,
                    "MB")))) : (React.createElement("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded border" },
                React.createElement("div", { className: "flex items-center space-x-3" },
                    React.createElement(FileIcon, { className: "w-5 h-5 text-gray-500" }),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-medium text-gray-900" }, value.name),
                        React.createElement("p", { className: "text-xs text-gray-500" }, formatFileSize(value.size)))),
                React.createElement("button", { type: "button", onClick: handleRemoveFile, className: "text-red-500 hover:text-red-700 p-1" },
                    React.createElement(TrashIcon, { className: "w-4 h-4" }))))),
        error && (React.createElement("p", { className: "text-sm text-red-500 mt-1" }, error))));
}
//# sourceMappingURL=FileField.js.map