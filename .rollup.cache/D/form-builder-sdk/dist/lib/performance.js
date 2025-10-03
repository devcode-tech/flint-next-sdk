class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
    }
    start(label) {
        this.metrics.set(label, performance.now());
    }
    end(label) {
        const startTime = this.metrics.get(label);
        if (startTime) {
            const duration = performance.now() - startTime;
            this.metrics.delete(label);
            if (process.env.NODE_ENV !== 'production') {
                console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
            }
            return duration;
        }
        return 0;
    }
    reportWebVitals() {
        if (typeof window === 'undefined')
            return;
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                }
            }
            console.log('CLS:', clsScore);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
}
export const perfMonitor = new PerformanceMonitor();
//# sourceMappingURL=performance.js.map