/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "gray-black": "#141414",
                "gray-card": "#262626",
                "gray-white": "#a4a4a4",
                "white-slate": "#F8F8F8",
                "accent": "#41abff"
            },
            padding: {
                mobile: '1rem',
                small: '3rem',
                medium: '6rem'
            }
        },
    },
    plugins: [],
}
