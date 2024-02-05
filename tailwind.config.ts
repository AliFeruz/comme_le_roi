import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     colors: {
      'lavanda': {
        '50': '#fcf4ff',
        '100': '#f7e9fe',
        '200': '#f1d2fc',
        '300': '#e8aef9',
        '400': '#df8ef5',
        '500': '#c74de8',
        '600': '#ad2dcc',
        '700': '#9222a9',
        '800': '#791e8a',
        '900': '#661e71',
        '950': '#42074b',
    },
    
     }
    },
  },
  plugins: [],
};
export default config;
