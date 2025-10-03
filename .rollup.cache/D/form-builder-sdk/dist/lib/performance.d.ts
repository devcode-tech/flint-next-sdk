declare class PerformanceMonitor {
    private metrics;
    start(label: string): void;
    end(label: string): number;
    reportWebVitals(): void;
}
export declare const perfMonitor: PerformanceMonitor;
export {};
