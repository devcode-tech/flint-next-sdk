import { FormData } from './types';
import { getSupabaseClient } from './supabase-client';

interface SubmissionResult {
	success: boolean;
	submissionId?: string;
	error?: string;
}

interface FormSchemaRow {
	id: string;
	form_id: string;
}

/**
 * Submit form data to Supabase
 * @param formId - The form_id (e.g., "B25DGW")
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
		console.log('came to submitFormToSupabase');

		const supabase = getSupabaseClient();

		// First, get the UUID of the form_schema based on form_id
		const { data: schemaData, error: schemaError } = await supabase
			.from('form_schemas')
			.select('id')
			.eq('form_id', formId)
			.single<FormSchemaRow>();

		if (schemaError || !schemaData) {
			console.error('Error finding form schema:', schemaError);
			return {
				success: false,
				error: 'Form schema not found',
			};
		}

		// Insert the submission
		const { data: submissionData, error: submissionError } = await supabase
			.from('form_submissions')
			.insert({
				form_id: schemaData.id, // UUID from form_schemas table
				data: data, // JSONB data
				ip_address: ipAddress || null,
			})
			.select('id')
			.single();

		if (submissionError) {
			console.error('Error submitting form:', submissionError);
			return {
				success: false,
				error: submissionError.message,
			};
		}

		return {
			success: true,
			submissionId: submissionData?.id,
		};
	} catch (error) {
		console.error('Unexpected error during form submission:', error);
		return {
			success: false,
			error: 'An unexpected error occurred',
		};
	}
}

/**
 * Get client IP address (best effort in browser)
 * Note: This is not reliable in browser. Better to get from server-side.
 */
export async function getClientIP(): Promise<string | null> {
	try {
		// Use a public IP API service
		const response = await fetch('https://api.ipify.org?format=json');
		const data = await response.json();
		return data.ip || null;
	} catch (error) {
		console.warn('Could not fetch client IP:', error);
		return null;
	}
}
