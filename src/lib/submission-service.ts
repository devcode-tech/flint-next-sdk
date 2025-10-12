import { FormData } from './types';
import { getSupabaseClient } from './supabase-client';

interface SubmissionResult {
	success: boolean;
	submissionId?: string;
	error?: string;
}

import { FormSchema } from './types';

interface FormSchemaRow {
	id: string;
	form_id: string;
}

function sanitizeData(
	data: FormData,
	options?: { exclude?: string[] }
): FormData {
	const sanitizedData: FormData = {};
	const excludeFields = options?.exclude || [];

	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			const value = data[key];

			if (excludeFields.includes(key)) {
				sanitizedData[key] = value;
				continue;
			}

			if (typeof value === 'string') {
				sanitizedData[key] = value.replace(/[<>"']/g, '');
			} else {
				sanitizedData[key] = value;
			}
		}
	}
	return sanitizedData;
}

/**
 * Submit form data to Supabase
 * @param schema - The full form schema object
 * @param data - The form data to submit
 * @param ipAddress - Optional IP address of the submitter
 * @returns SubmissionResult with success status and submission ID
 */
export async function submitFormToSupabase(
	formId: string,
	data: FormData,
	ipAddress?: string
): Promise<SubmissionResult> {
	try {
		const supabase = getSupabaseClient();

		// 1. Get the UUID of the form_schema based on form_id
		const { data: schemaData, error: schemaError } = await supabase
			.from('form_schemas')
			.select('id, schema') // The 'fields' are inside the 'schema' JSONB column
			.eq('form_id', formId)
			.single<{ id: string; schema: FormSchema }>();

		if (schemaError || !schemaData) {
			console.error('Error finding form schema:', schemaError);
			return {
				success: false,
				error: 'Form schema not found',
			};
		}

		// 2. Sanitize data before submission, excluding non-string fields
		const fieldsToExclude = schemaData.schema.fields
			.filter(
				f =>
					f.type === 'date' ||
					f.type === 'file' ||
					f.type === 'checkbox' ||
					f.type === 'terms'
			)
			.map(f => f.name);
		const sanitizedData = sanitizeData(data, { exclude: fieldsToExclude });

		// 3. Insert the submission
		const { data: submissionData, error: submissionError } = await supabase
			.from('form_submissions')
			.insert({
				form_id: schemaData.id, // Use the fetched UUID
				data: sanitizedData, // JSONB data
				ip_address: ipAddress || null,
			})
			.select('id')
			.single();

		if (submissionError) {
			console.error('Error inserting submission:', submissionError);
			return {
				success: false,
				error: submissionError.message,
			};
		}

		return {
			success: true,
			submissionId: submissionData.id,
		};
	} catch (error: any) {
		console.error('Unexpected error during submission:', error);
		return {
			success: false,
			error: error.message || 'An unexpected error occurred',
		};
	}
}
