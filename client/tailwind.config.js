/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        dashboard: "320px 1fr",
      },
      gridTemplateRows: {
        dashboard: "64px 1fr",
      },
      gridRow: {
        sidebar: "1 / 3",
      },
      gridColumn: {
        header: "1 / 3",
        "header-md": "2",
        content: "1 / 3",
        "content-md": "2",
      },
    },
  },
  plugins: [],
};
