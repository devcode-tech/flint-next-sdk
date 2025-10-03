/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Layout & Sizing
    { pattern: /^(w|max-w|min-w)-/ },
    { pattern: /^(h|max-h|min-h)-/ },
    
    // Spacing
    { pattern: /^(p|px|py|pt|pb|pl|pr)-/ },
    { pattern: /^(m|mx|my|mt|mb|ml|mr)-/ },
    { pattern: /^(gap|space-x|space-y)-/ },
    
    // Typography
    { pattern: /^text-/ },
    { pattern: /^font-/ },
    { pattern: /^leading-/ },
    { pattern: /^tracking-/ },
    
    // Colors & Backgrounds
    { pattern: /^bg-/ },
    { pattern: /^border-/ },
    { pattern: /^ring-/ },
    
    // Effects
    { pattern: /^shadow-/ },
    { pattern: /^rounded-/ },
    { pattern: /^opacity-/ },
    
    // Layout
    { pattern: /^(flex|grid|block|inline|hidden)/ },
    { pattern: /^(items|justify|content|self)-/ },
    
    // Specific classes with hover/focus states
    'hover:bg-blue-700',
    'hover:bg-gray-100',
    'hover:border-gray-400',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'focus:ring-offset-2',
    'focus:border-blue-500',
    'focus:border-transparent',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-gray-400',
    'active:bg-blue-800',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
