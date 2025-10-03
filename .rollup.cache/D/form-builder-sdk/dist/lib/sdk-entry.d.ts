import type { FormData } from '@/lib/types';
import './sdk-styles.css';
interface FlintFormConfig {
    containerId?: string;
    onSubmit?: (data: FormData) => void | Promise<void>;
    onError?: (error: Error) => void;
    enableRateLimiting?: boolean;
    maxRetries?: number;
}
declare class FlintForm {
    private root;
    private container;
    private config;
    private retryCount;
    init(config?: FlintFormConfig): void;
    private secureContainer;
    private sanitizeFormData;
    private handleSubmissionError;
    private handleError;
    destroy(): void;
    static getVersion(): string;
    isInitialized(): boolean;
}
export { FlintForm };
export default FlintForm;
