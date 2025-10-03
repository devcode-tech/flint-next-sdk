import { __awaiter } from "tslib";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DynamicForm } from '@/components/DynamicForm';
import formSchema from '@/app/page-schema';
import { validateFormData, rateLimiter, sanitizeInput } from './security';
import './sdk-styles.css';
class FlintForm {
    constructor() {
        this.root = null;
        this.container = null;
        this.config = null;
        this.retryCount = 0;
    }
    init(config) {
        const { containerId = 'flint-form-root', onSubmit, onError, enableRateLimiting = true, maxRetries = 3 } = config || {};
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
        this.secureContainer();
        const secureOnSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!validateFormData(data)) {
                    throw new Error('Invalid form data detected');
                }
                if (enableRateLimiting && !rateLimiter.isAllowed(containerId)) {
                    throw new Error('Too many submission attempts. Please wait before trying again.');
                }
                const sanitizedData = this.sanitizeFormData(data);
                if (onSubmit) {
                    yield onSubmit(sanitizedData);
                    rateLimiter.reset(containerId);
                }
                else {
                    console.log('Form submitted:', sanitizedData);
                    alert('Form submitted successfully!');
                }
                this.retryCount = 0;
            }
            catch (error) {
                this.handleSubmissionError(error, data);
            }
        });
        try {
            this.root = ReactDOM.createRoot(this.container);
            this.root.render(React.createElement(DynamicForm, {
                schema: formSchema,
                onSubmit: secureOnSubmit
            }));
        }
        catch (error) {
            this.handleError(error, onError);
        }
    }
    secureContainer() {
        if (!this.container)
            return;
        this.container.style.position = 'relative';
        this.container.style.zIndex = '1';
        this.container.setAttribute('data-flint-form', 'true');
        this.container.setAttribute('role', 'form');
        this.container.setAttribute('aria-label', 'Dynamic Form');
    }
    sanitizeFormData(data) {
        const sanitized = {};
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'string') {
                sanitized[key] = sanitizeInput(value);
            }
            else if (Array.isArray(value)) {
                sanitized[key] = value.map(v => typeof v === 'string' ? sanitizeInput(v) : v);
            }
            else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
    handleSubmissionError(error, originalData) {
        const { maxRetries = 3, onError } = this.config || {};
        if (this.retryCount < maxRetries && error.message.includes('network')) {
            this.retryCount++;
            console.warn(`Retrying submission (${this.retryCount}/${maxRetries})...`);
            setTimeout(() => {
                var _a;
                if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.onSubmit) {
                    this.config.onSubmit(originalData);
                }
            }, 1000 * this.retryCount);
        }
        else {
            this.handleError(error, onError);
            this.retryCount = 0;
        }
    }
    handleError(error, onError) {
        const safeError = new Error('An error occurred. Please try again.');
        if (process.env.NODE_ENV !== 'production') {
            console.error('Flint Form Error:', error);
        }
        if (onError) {
            onError(safeError);
        }
        else {
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
    static getVersion() {
        return '1.0.0';
    }
    isInitialized() {
        return this.root !== null;
    }
}
if (typeof window !== 'undefined') {
    window.FlintForm = FlintForm;
    const autoInit = () => {
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
    }
    else {
        autoInit();
    }
}
export { FlintForm };
export default FlintForm;
//# sourceMappingURL=sdk-entry.js.map