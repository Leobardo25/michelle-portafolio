/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Paleta Midnight Purple
                brand: {
                    purple: '#9333EA', // Primary Action (Purple 600)
                    dark: '#000000', // Pure Black
                    darker: '#0a0a0a', // Rich Black (Cards)
                    gray: '#18181b', // Zinc 900 (Secondary BG)
                    silver: '#e2e8f0', // Slate 200 (Text)
                    muted: '#71717a', // Zinc 500 (Muted Text)
                },
            },
            fontFamily: {
                display: ['Montserrat', 'sans-serif'],
                body: ['Montserrat', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out',
                'pulse-slow': 'pulsePurple 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spotlight': 'spotlight 2s ease-out forwards',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulsePurple: {
                    '0%, 100%': { opacity: '1', boxShadow: '0 0 0px rgba(147, 51, 234, 0)' },
                    '50%': { opacity: '0.9', boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' },
                },
                spotlight: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            boxShadow: {
                'glow-purple': '0 0 30px -5px rgba(147, 51, 234, 0.4)',
                'glow-purple-lg': '0 0 50px -10px rgba(147, 51, 234, 0.6)',
            }
        },
    },
    plugins: [],
}
