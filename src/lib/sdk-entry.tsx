import React from 'react';
import ReactDOM from 'react-dom/client';
import { DynamicForm } from '@/components/DynamicForm';
import { Modal } from '@/components/Modal';
import type { FormData, FormSchema } from '@/lib/types';
import formSchema from '@/app/page-schema';
import { validateFormData, rateLimiter, sanitizeInput } from './security';
import { fetchFormSchema } from './schema-service';
import { initializeSupabaseClient } from './supabase-client';
import { submitFormToSupabase } from './submission-service';

// Import bundled styles
import './sdk-styles.css';

interface FlintFormConfig {
	containerId?: string;
	formId?: string; // form_id to fetch schema from Supabase
	schema?: FormSchema; // Optional direct schema override
	onSubmit?: (data: FormData) => void | Promise<void>; // Custom submit handler
	onError?: (error: Error) => void;
	onSchemaLoad?: (schema: FormSchema) => void;
	onSubmitSuccess?: (submissionId?: string) => void; // NEW: Called after successful submission
	enableRateLimiting?: boolean;
	maxRetries?: number;
	autoSubmitToSupabase?: boolean; // NEW: Auto-submit to Supabase (default: true if formId provided)
	captureIP?: boolean; // NEW: Capture IP address for submissions (default: false)
	supabaseUrl?: string; // Supabase project URL
	supabaseAnonKey?: string; // Supabase anonymous key
}

class FlintForm {
	private root: ReactDOM.Root | null = null;
	private container: HTMLElement | null = null;
	private config: FlintFormConfig | null = null;
	private retryCount: number = 0;
	private loadedSchema: FormSchema | null = null;

	async init(config?: FlintFormConfig) {
		const {
			containerId = 'flint-form-root',
			formId,
			schema,
			onSubmit,
			onError,
			onSchemaLoad,
			onSubmitSuccess,
			enableRateLimiting = true,
			maxRetries = 3,
			autoSubmitToSupabase = formId ? true : false, // Auto-enable if formId provided
			captureIP = false,
			supabaseUrl,
			supabaseAnonKey,
		} = config || {};

		// Initialize Supabase client if credentials are provided
		if (supabaseUrl && supabaseAnonKey) {
			initializeSupabaseClient(supabaseUrl, supabaseAnonKey);
		}

		this.config = {
			containerId,
			formId,
			schema,
			onSubmit,
			onError,
			onSchemaLoad,
			onSubmitSuccess,
			enableRateLimiting,
			maxRetries,
			autoSubmitToSupabase,
			captureIP,
			supabaseUrl,
			supabaseAnonKey,
		};

		this.container = document.getElementById(containerId);

		if (!this.container) {
			const error = new Error(`Container with id "${containerId}" not found`);
			this.handleError(error, onError);
			return;
		}

		// Secure the container
		this.secureContainer();

		// Show loading state
		this.showLoading();

		try {
			// Determine which schema to use
			let schemaToUse: FormSchema;

			if (schema) {
				// Use provided schema directly
				schemaToUse = schema;
			} else if (formId) {
				// Fetch schema from Supabase
				const fetchedSchema = await fetchFormSchema(formId);
				if (!fetchedSchema) {
					throw new Error(`Failed to load form schema for form_id: ${formId}`);
				}
				schemaToUse = fetchedSchema;
			} else {
				// Fallback to default schema
				schemaToUse = formSchema;
			}

			this.loadedSchema = schemaToUse;

			// Notify schema loaded
			if (onSchemaLoad) {
				onSchemaLoad(schemaToUse);
			}

			// Check for modal attribute
			const showModal = this.container.dataset.showModal === 'true';

			// Render the form
			await this.renderForm(schemaToUse, showModal);
		} catch (error) {
			this.handleError(error as Error, onError);
			this.showError('Failed to load form. Please try again.');
		}
	}

	private async renderForm(schema: FormSchema, showModal: boolean) {
		const {
			onSubmit,
			enableRateLimiting,
			containerId,
			autoSubmitToSupabase,
			formId,
			captureIP,
			onSubmitSuccess,
		} = this.config || {};

		const secureOnSubmit = async (data: FormData) => {
			try {
				// Security validation
				if (!validateFormData(data)) {
					throw new Error('Invalid form data detected');
				}

				// Rate limiting
				if (
					enableRateLimiting &&
					!rateLimiter.isAllowed(containerId || 'flint-form-root')
				) {
					throw new Error(
						'Too many submission attempts. Please wait before trying again.'
					);
				}

				// Handle submission based on configuration
				if (autoSubmitToSupabase && formId) {
					// Auto-submit to Supabase
					let ipAddress: string | null = null;

					const result = await submitFormToSupabase(
						formId,
						data, // Pass the raw data
						ipAddress || undefined
					);

					if (!result.success) {
						throw new Error(result.error || 'Failed to submit form');
					}

					// Call success callback
					if (onSubmitSuccess) {
						onSubmitSuccess(result.submissionId);
					}

					// Also call custom onSubmit if provided (for additional processing)
					if (onSubmit) {
						await onSubmit(data);
					}

					alert('Form submitted successfully!');
				} else if (onSubmit) {
					// Use custom submit handler
					await onSubmit(data);
					if (onSubmitSuccess) {
						onSubmitSuccess();
					}
				} else {
					// Default behavior
					alert('Form submitted successfully!');
				}

				rateLimiter.reset(containerId || 'flint-form-root');
				this.retryCount = 0;
			} catch (error) {
				console.error('❌ Error in secureOnSubmit:', error);
				this.handleSubmissionError(error as Error, data);
			}
		};

		if (!this.container) return;

		this.root = ReactDOM.createRoot(this.container);

		const supabaseConfig =
			this.config && this.config.supabaseUrl && this.config.supabaseAnonKey
				? {
						url: this.config.supabaseUrl,
						anonKey: this.config.supabaseAnonKey,
				  }
				: undefined;

		const formElement = React.createElement(DynamicForm, {
			schema: schema,
			onSubmit: secureOnSubmit,
		});

		if (showModal) {
			this.root.render(
				React.createElement(Modal, {
					onClose: () => this.unmount(),
					children: formElement,
				})
			);
		} else {
			this.root.render(formElement);
		}
	}

	private showLoading() {
		if (!this.container) return;
		this.container.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 200px;">
        <div style="text-align: center;">
          <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
          <p style="margin-top: 16px; color: #666;">Loading form...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
	}

	private showError(message: string) {
		if (!this.container) return;
		this.container.innerHTML = `
      <div style="padding: 20px; background-color: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33;">
        <strong>Error:</strong> ${message}
      </div>
    `;
	}

	private secureContainer() {
		if (!this.container) return;

		// Prevent clickjacking
		this.container.style.position = 'relative';
		this.container.style.zIndex = '1';

		// Add security attributes
		this.container.setAttribute('data-flint-form', 'true');
		this.container.setAttribute('role', 'form');
		this.container.setAttribute('aria-label', 'Dynamic Form');
	}

	private sanitizeFormData(data: FormData): FormData {
		const sanitized: FormData = {};

		for (const [key, value] of Object.entries(data)) {
			if (typeof value === 'string') {
				sanitized[key] = sanitizeInput(value);
			} else if (Array.isArray(value)) {
				sanitized[key] = value.map(v =>
					typeof v === 'string' ? sanitizeInput(v) : v
				);
			} else {
				sanitized[key] = value;
			}
		}

		return sanitized;
	}

	private handleSubmissionError(error: Error, originalData: FormData) {
		const { maxRetries = 3, onError } = this.config || {};

		if (this.retryCount < maxRetries && error.message.includes('network')) {
			this.retryCount++;
			console.warn(`Retrying submission (${this.retryCount}/${maxRetries})...`);

			setTimeout(() => {
				if (this.config?.onSubmit) {
					this.config.onSubmit(originalData);
				}
			}, 1000 * this.retryCount);
		} else {
			this.handleError(error, onError);
			this.retryCount = 0;
		}
	}

	unmount() {
		if (this.root) {
			this.root.unmount();
			this.root = null;
		}
	}

	private handleError(error: Error, onError?: (error: Error) => void) {
		const safeError = new Error('An error occurred. Please try again.');

		// Always log in development (no process.env check for browser)
		if (
			typeof window !== 'undefined' &&
			(window as any).FLINT_FORM_CONFIG?.DEBUG
		) {
			console.error('Flint Form Error:', error);
		}

		if (onError) {
			onError(safeError);
		} else {
			console.error('Flint Form:', safeError.message);
		}
	}

	destroy() {
		if (this.root) {
			this.root.unmount();
			this.root = null;
			this.container = null;
			this.config = null;
			this.retryCount = 0;
			this.loadedSchema = null;
		}
	}

	getLoadedSchema(): FormSchema | null {
		return this.loadedSchema;
	}

	static getVersion(): string {
		return '1.0.0';
	}

	isInitialized(): boolean {
		return this.root !== null;
	}
}

// Auto-initialize with security checks
if (typeof window !== 'undefined') {
	(window as any).FlintForm = FlintForm;

	const autoInit = async () => {
		if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
			console.warn('Flint Form: For security, please use HTTPS in production');
		}

		const container = document.getElementById('flint-form-root');
		if (container) {
			const formId = container.getAttribute('data-form-id');
			const autoSubmit = container.getAttribute('data-auto-submit') !== 'false';
			const captureIP = container.getAttribute('data-capture-ip') === 'true';

			// Get Supabase config from window object
			const config = (window as any).FLINT_FORM_CONFIG || {};
			const supabaseUrl =
				config.NEXT_PUBLIC_SUPABASE_URL || config.SUPABASE_URL;
			const supabaseAnonKey =
				config.NEXT_PUBLIC_SUPABASE_ANON_KEY || config.SUPABASE_ANON_KEY;

			const form = new FlintForm();
			await form.init({
				formId: formId || undefined,
				autoSubmitToSupabase: autoSubmit,
				captureIP: captureIP,
				supabaseUrl: supabaseUrl,
				supabaseAnonKey: supabaseAnonKey,
			});
		}
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', autoInit);
	} else {
		autoInit();
	}
}

export { FlintForm };
export default FlintForm;
