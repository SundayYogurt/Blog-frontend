/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        blog_light: {
          "primary": "#1a73e8",
          "secondary": "#f1f3f4",
          "accent": "#d2e3fc",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
        blog_dark: {
          "primary": "#8ab4f8",
          "secondary": "#202124",
          "accent": "#3c4043",
          "neutral": "#bdc1c6",
          "base-100": "#121212",
        },
      },
      "light",
      "dark",
    ],
  },
}
