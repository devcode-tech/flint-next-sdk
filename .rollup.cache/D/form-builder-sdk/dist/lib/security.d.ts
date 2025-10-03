export declare function sanitizeInput(input: string): string;
export declare function sanitizeUrl(url: string): string;
export declare function setupCSP(): void;
export declare function validateFormData(data: Record<string, any>): boolean;
declare class RateLimiter {
    private attempts;
    private readonly maxAttempts;
    private readonly windowMs;
    isAllowed(key: string): boolean;
    reset(key: string): void;
}
export declare const rateLimiter: RateLimiter;
export {};
