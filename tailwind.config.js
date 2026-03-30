/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0F172B',    
        'border-line': '#1E2D3D',   
        'text-main': '#E5E9F0',     
        'text-comment': '#607B96',  
        'accent-purple': '#4D5BCE', 
        'accent-green': '#43D9AD',  
        'accent-orange': '#FEA55F', 
      },
      fontFamily: {
        'fira': ['"Fira Code"', 'monospace'],
      }
    },
  },
  plugins: [],
}