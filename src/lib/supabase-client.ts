import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase client singleton
let supabaseClient: SupabaseClient | null = null;

// Get env variables from window object (set by user) or use empty strings
function getEnvVar(key: string): string {
	// Check if running in browser
	if (typeof window !== 'undefined') {
		// Check window object for config
		const config = (window as any).FLINT_FORM_CONFIG;
		if (config && config[key]) {
			return config[key];
		}
	}
	return '';
}

export function getSupabaseClient(): SupabaseClient {
	if (!supabaseClient) {
		const supabaseUrl = getEnvVar('SUPABASE_URL');
		const supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY');

		if (!supabaseUrl || !supabaseAnonKey) {
			throw new Error(
				'Supabase URL and Anon Key must be configured. Set window.FLINT_FORM_CONFIG = { SUPABASE_URL: "...", SUPABASE_ANON_KEY: "..." }'
			);
		}

		supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
			},
		});
	}

	return supabaseClient;
}

export function resetSupabaseClient() {
	supabaseClient = null;
}
