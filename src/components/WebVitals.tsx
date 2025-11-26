import { useEffect } from 'react';

/**
 * Web Vitals Monitoring Component
 * Tracks Core Web Vitals and sends to analytics
 */

interface WebVitalsMetric {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    delta: number;
    id: string;
}

// Thresholds for Core Web Vitals (in milliseconds or score)
const THRESHOLDS = {
    LCP: { good: 2500, poor: 4000 },      // Largest Contentful Paint
    CLS: { good: 0.1, poor: 0.25 },       // Cumulative Layout Shift
    FCP: { good: 1800, poor: 3000 },      // First Contentful Paint
    TTFB: { good: 800, poor: 1800 },      // Time to First Byte
    INP: { good: 200, poor: 500 },        // Interaction to Next Paint
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
}

function sendToAnalytics(metric: WebVitalsMetric) {
    // Log to console in development
    if (import.meta.env.DEV) {
        console.log(`[Web Vitals] ${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            id: metric.id,
        });
    }

    // Send to analytics service (Google Analytics, custom endpoint, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
        });
    }

    // Custom analytics endpoint
    if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
        fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                metric: metric.name,
                value: metric.value,
                rating: metric.rating,
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent,
            }),
            keepalive: true,
        }).catch(() => {
            // Silently fail - don't block user experience
        });
    }
}

function reportWebVitals() {
    // Dynamically import web-vitals library
    import('web-vitals').then(({ onCLS, onLCP, onFCP, onTTFB, onINP }) => {
        onCLS((metric) => {
            sendToAnalytics({
                name: 'CLS',
                value: metric.value,
                rating: getRating('CLS', metric.value),
                delta: metric.delta,
                id: metric.id,
            });
        });

        onLCP((metric) => {
            sendToAnalytics({
                name: 'LCP',
                value: metric.value,
                rating: getRating('LCP', metric.value),
                delta: metric.delta,
                id: metric.id,
            });
        });

        onFCP((metric) => {
            sendToAnalytics({
                name: 'FCP',
                value: metric.value,
                rating: getRating('FCP', metric.value),
                delta: metric.delta,
                id: metric.id,
            });
        });

        onTTFB((metric) => {
            sendToAnalytics({
                name: 'TTFB',
                value: metric.value,
                rating: getRating('TTFB', metric.value),
                delta: metric.delta,
                id: metric.id,
            });
        });

        onINP((metric) => {
            sendToAnalytics({
                name: 'INP',
                value: metric.value,
                rating: getRating('INP', metric.value),
                delta: metric.delta,
                id: metric.id,
            });
        });
    }).catch((error) => {
        console.error('Failed to load web-vitals:', error);
    });
}

export function WebVitals() {
    useEffect(() => {
        // Only run in production or when explicitly enabled
        if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_WEB_VITALS === 'true') {
            reportWebVitals();
        }

        // Performance marks for custom timing
        if (typeof window !== 'undefined' && window.performance) {
            performance.mark('app-mounted');

            // Measure time from navigation start to app mount
            try {
                performance.measure('app-mount-time', 'navigationStart', 'app-mounted');
                const measure = performance.getEntriesByName('app-mount-time')[0];

                if (import.meta.env.DEV) {
                    console.log(`[Performance] App mount time: ${measure.duration.toFixed(2)}ms`);
                }
            } catch (error) {
                // Silently fail
            }
        }
    }, []);

    return null; // This component doesn't render anything
}

// Export for manual usage
export { reportWebVitals };
