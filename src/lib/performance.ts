/**
 * Performance monitoring utilities
 */

class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();

  start(label: string) {
    this.metrics.set(label, performance.now());
  }

  end(label: string) {
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

  // Report Core Web Vitals
  reportWebVitals() {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsScore += (entry as any).value;
        }
      }
      console.log('CLS:', clsScore);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
}

export const perfMonitor = new PerformanceMonitor();