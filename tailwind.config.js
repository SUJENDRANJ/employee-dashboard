/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // data-terminal / inspector palette
        ink: "#0D1117",
        paper: "#F5F1E8",
        signal: "#FF6B35",
        terminal: "#3A7D5C",
        muted: "#8B8378",
        rust: "#C44536",

        // dark mode surfaces (cards / panels sit on top of the ink page bg)
        surface: "#141A21",
        surface2: "#1B222B",
        edge: "#2A323D",

        // lighter variants used ONLY in dark mode for readable text on dark surfaces
        "terminal-light": "#5FCB94",
        "rust-light": "#F0776A",
        "muted-light": "#A9A297",
        "signal-light": "#FF8B5C",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Source Serif 4", "serif"],
      },
    },
  },
  plugins: [],
}
