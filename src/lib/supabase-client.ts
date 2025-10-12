import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase client singleton
let supabaseClient: SupabaseClient | null = null;

/**
 * Initializes the Supabase client singleton. This should only be called once.
 * @param url - The Supabase project URL.
 * @param anonKey - The Supabase anonymous key.
 */
export function initializeSupabaseClient(url: string, anonKey: string) {
	if (!supabaseClient) {
		if (!url || !anonKey) {
			console.error('Supabase URL and Anon Key are required for initialization.');
			return;
		}
		supabaseClient = createClient(url, anonKey, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
			},
		});
	}
	return supabaseClient;
}

/**
 * Returns the existing Supabase client instance.
 * Throws an error if the client has not been initialized.
 */
export function getSupabaseClient(): SupabaseClient {
	if (!supabaseClient) {
		// Attempt to initialize from window object as a fallback for standalone usage
		if (typeof window !== 'undefined') {
			const config = (window as any).FLINT_FORM_CONFIG || {};
			const url = config.SUPABASE_URL || config.NEXT_PUBLIC_SUPABASE_URL;
			const anonKey = config.SUPABASE_ANON_KEY || config.NEXT_PUBLIC_SUPABASE_ANON_KEY;
			if (url && anonKey) {
				return initializeSupabaseClient(url, anonKey) as SupabaseClient;
			}
		}
		throw new Error('Supabase client has not been initialized. Call initializeSupabaseClient first.');
	}
	return supabaseClient;
}

export function resetSupabaseClient() {
	supabaseClient = null;
}
