import { FormSchema } from './types';
import { getSupabaseClient } from './supabase-client';

interface FormSchemaRow {
	id: string;
	title: string;
	description: string | null;
	schema: any;
	form_id: string | null;
	created_at: string;
	updated_at: string;
}

export async function fetchFormSchema(
	formId: string
): Promise<FormSchema | null> {
	try {
		const supabase = getSupabaseClient();

		const { data, error } = await supabase
			.from('form_schemas')
			.select('*')
			.eq('form_id', formId)
			.single<FormSchemaRow>();

		if (error) {
			console.error('Error fetching form schema:', error);
			return null;
		}

		if (!data) {
			console.warn(`No form schema found for form_id: ${formId}`);
			return null;
		}

		// The schema column contains the FormSchema JSON
		return data.schema as FormSchema;
	} catch (error) {
		console.error('Unexpected error fetching form schema:', error);
		return null;
	}
}

export async function validateFormSchemaStructure(
	schema: any
): Promise<boolean> {
	// Basic validation to ensure the schema has required fields
	if (!schema || typeof schema !== 'object') {
		return false;
	}

	const requiredFields = ['id', 'name', 'title', 'fields', 'design'];
	for (const field of requiredFields) {
		if (!(field in schema)) {
			console.error(`Missing required field in schema: ${field}`);
			return false;
		}
	}

	if (!Array.isArray(schema.fields)) {
		console.error('Schema fields must be an array');
		return false;
	}

	return true;
}
