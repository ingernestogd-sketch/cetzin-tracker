/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFF0F5',
        header: '#F4C0D1',
        border: '#ED93B1',
        primary: '#D4537E',
        dark: '#4B1528',
        text2: '#72243E',
        cardSoft: '#FBEAF0',
        gold: '#EF9F27',
        goldSoft: '#FAC775',
        ok: '#3B6D11',
        warn: '#BA7517',
        bad: '#A32D2D',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
