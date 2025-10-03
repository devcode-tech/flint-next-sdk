import React from "react";
import { FormSchema, FormData } from "@/lib/types";
interface DynamicFormProps {
    schema: FormSchema;
    onSubmit: (data: FormData) => void | Promise<void>;
    isSubmitting?: boolean;
    className?: string;
}
export declare function DynamicForm({ schema, onSubmit, isSubmitting, className }: DynamicFormProps): React.JSX.Element;
export {};
