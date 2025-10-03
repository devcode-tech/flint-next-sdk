import { z } from "zod";
import { FormField, FormSchema } from "@/lib/types";
export declare function createFieldValidation(field: FormField): z.ZodTypeAny;
export declare function createFormValidationSchema(schema: FormSchema): z.ZodSchema<any>;
export type FormValidationSchema = z.infer<ReturnType<typeof createFormValidationSchema>>;
