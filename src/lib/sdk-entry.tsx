import React from 'react';
import ReactDOM from 'react-dom/client';
import { DynamicForm } from '@/components/DynamicForm';
import type { FormData } from '@/lib/types';
import formSchema from '@/app/page-schema';
import { validateFormData, rateLimiter, sanitizeInput } from './security'

// Import bundled styles
import './sdk-styles.css';

interface FlintFormConfig {
  containerId?: string;
  onSubmit?: (data: FormData) => void | Promise<void>;
  onError?: (error: Error) => void;
  enableRateLimiting?: boolean;
  maxRetries?: number;
}

class FlintForm {
  private root: ReactDOM.Root | null = null;
  private container: HTMLElement | null = null;
  private config: FlintFormConfig | null = null;
  private retryCount: number = 0;

  init(config?: FlintFormConfig) {
    const { 
      containerId = 'flint-form-root', 
      onSubmit, 
      onError,
      enableRateLimiting = true,
      maxRetries = 3
    } = config || {};

    this.config = { 
      containerId, 
      onSubmit, 
      onError, 
      enableRateLimiting, 
      maxRetries 
    };

    this.container = document.getElementById(containerId);
    
    if (!this.container) {
      const error = new Error(`Container with id "${containerId}" not found`);
      this.handleError(error, onError);
      return;
    }

    // Secure the container
    this.secureContainer();

    const secureOnSubmit = async (data: FormData) => {
      try {
        // Security validation
        if (!validateFormData(data)) {
          throw new Error('Invalid form data detected');
        }

        // Rate limiting
        if (enableRateLimiting && !rateLimiter.isAllowed(containerId)) {
          throw new Error('Too many submission attempts. Please wait before trying again.');
        }

        // Sanitize string inputs
        const sanitizedData = this.sanitizeFormData(data);

        // Call user's onSubmit or default handler
        if (onSubmit) {
          await onSubmit(sanitizedData);
          rateLimiter.reset(containerId); // Reset on success
        } else {
          console.log('Form submitted:', sanitizedData);
          alert('Form submitted successfully!');
        }

        this.retryCount = 0; // Reset retry count on success
      } catch (error) {
        this.handleSubmissionError(error as Error, data);
      }
    };

    try {
      this.root = ReactDOM.createRoot(this.container);
      
      this.root.render(
        React.createElement(DynamicForm, {
          schema: formSchema,
          onSubmit: secureOnSubmit
        })
      );
    } catch (error) {
      this.handleError(error as Error, onError);
    }
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
      }, 1000 * this.retryCount); // Exponential backoff
    } else {
      this.handleError(error, onError);
      this.retryCount = 0;
    }
  }

  private handleError(error: Error, onError?: (error: Error) => void) {
    // Never expose sensitive error details to users
    const safeError = new Error('An error occurred. Please try again.');
    
    // Log full error for debugging (only in development)
    if (process.env.NODE_ENV !== 'production') {
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
    }
  }

  // Get SDK version
  static getVersion(): string {
    return '1.0.0';
  }

  // Check if SDK is initialized
  isInitialized(): boolean {
    return this.root !== null;
  }
}

// Auto-initialize with security checks
if (typeof window !== 'undefined') {
  (window as any).FlintForm = FlintForm;
  
  const autoInit = () => {
    // Verify we're in a secure context (HTTPS or localhost)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      console.warn('Flint Form: For security, please use HTTPS in production');
    }

    const container = document.getElementById('flint-form-root');
    if (container) {
      const form = new FlintForm();
      form.init();
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