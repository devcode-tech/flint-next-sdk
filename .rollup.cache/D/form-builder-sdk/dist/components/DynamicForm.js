"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormValidationSchema } from "@/lib/validation";
import { cn, applyInlineStyles } from "@/lib/utils";
import { TextField, EmailField, DateField, PostalField, FileField, CheckboxField, DropdownField, TermsField } from "@/components/fields";
function FormField({ field, register, setValue, watch, errors, trigger, isSubmitted }) {
    var _a;
    const value = watch(field.name);
    const error = (_a = errors[field.name]) === null || _a === void 0 ? void 0 : _a.message;
    React.useEffect(() => {
        register(field.name);
    }, [register, field.name]);
    const handleChange = (newValue) => {
        setValue(field.name, newValue, { shouldValidate: false, shouldDirty: true });
        if (isSubmitted) {
            setTimeout(() => {
                trigger(field.name);
            }, 300);
        }
    };
    const handleBlur = () => {
        trigger(field.name);
    };
    const fieldProps = {
        field,
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        error,
        className: ""
    };
    switch (field.type) {
        case "text":
            return React.createElement(TextField, Object.assign({}, fieldProps));
        case "email":
            return React.createElement(EmailField, Object.assign({}, fieldProps));
        case "date":
            return React.createElement(DateField, Object.assign({}, fieldProps));
        case "postal":
            return React.createElement(PostalField, Object.assign({}, fieldProps));
        case "file":
            return React.createElement(FileField, Object.assign({}, fieldProps));
        case "checkbox":
            return React.createElement(CheckboxField, Object.assign({}, fieldProps));
        case "dropdown":
            return React.createElement(DropdownField, Object.assign({}, fieldProps));
        case "terms":
            return React.createElement(TermsField, Object.assign({}, fieldProps));
        default:
            return React.createElement(TextField, Object.assign({}, fieldProps));
    }
}
export function DynamicForm({ schema, onSubmit, isSubmitting = false, className }) {
    const validationSchema = createFormValidationSchema(schema);
    React.useEffect(() => {
        if (schema.design['font-link'] && schema.design['font-family'] === 'custom') {
            const existingLink = document.querySelector(`link[href="${schema.design['font-link']}"]`);
            if (!existingLink) {
                const link = document.createElement('link');
                link.href = schema.design['font-link'];
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
        }
    }, [schema.design['font-link'], schema.design['font-family']]);
    const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, watch, trigger } = useForm({
        resolver: zodResolver(validationSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        shouldFocusError: true
    });
    const containerStyles = applyInlineStyles({
        'background-color': schema.design['background-color'],
        'font-family': schema.design['font-family'] === 'custom' ? 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' : schema.design['font-family'],
        padding: undefined,
        'border-radius': undefined,
        'box-shadow': undefined
    });
    const submitButtonStyles = applyInlineStyles({
        'background-color': schema.design['submit-button']['background-color'],
        color: schema.design['submit-button']['text-color'],
        padding: schema.design['submit-button'].padding,
        'border-radius': schema.design['submit-button']['border-radius'],
        'font-size': schema.design['submit-button']['font-size'],
        'font-weight': schema.design['submit-button']['font-weight']
    });
    const getSubmitButtonAlignment = () => {
        switch (schema.design['submit-button'].alignment) {
            case 'left':
                return 'justify-start';
            case 'right':
                return 'justify-end';
            case 'center':
            default:
                return 'justify-center';
        }
    };
    return (React.createElement("div", { className: cn("w-full", className) },
        React.createElement("form", { onSubmit: handleSubmit(onSubmit), className: cn(schema.design.padding, schema.design['max-width'], schema.design['border-radius'], schema.design['box-shadow'], "mx-auto", schema.design.spacing.container), style: containerStyles },
            schema.title && (React.createElement("div", { className: "mb-8 text-center" },
                React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, schema.title),
                schema.description && (React.createElement("p", { className: "mt-2 text-gray-600" }, schema.description)))),
            schema.design['logo-url'] && (React.createElement("div", { className: "mb-8 text-center" },
                React.createElement("img", { src: schema.design['logo-url'], alt: "Logo", className: "mx-auto max-h-20" }))),
            React.createElement("div", { className: "flex flex-wrap -mx-2" }, schema.fields.map((field) => {
                if (!field.name || !field.name.trim()) {
                    return (React.createElement("div", { key: field.id, className: cn(field.width, "px-2 mb-6") },
                        React.createElement(TermsField, { field: field, value: undefined, onChange: () => { }, className: "" })));
                }
                return (React.createElement("div", { key: field.id, className: cn(field.width, "px-2 mb-6") },
                    React.createElement(FormField, { field: field, register: register, setValue: setValue, watch: watch, errors: errors, trigger: trigger, isSubmitted: isSubmitted })));
            })),
            React.createElement("div", { className: cn("flex mt-8", getSubmitButtonAlignment()) },
                React.createElement("button", { type: "submit", disabled: isSubmitting, className: cn("px-8 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", schema.design['submit-button'].width === 'auto' ? 'w-auto' : 'w-full'), style: submitButtonStyles }, isSubmitting ? "Submitting..." : schema.design['submit-button'].text)))));
}
//# sourceMappingURL=DynamicForm.js.map