/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        primaryColor: '#FBB06E',
        secondaryColor: '#FFECDB',
        accentColor: '#ED6C24',
        'font-color': '#2E2828',
      },
      backgroundImage: {
        'login-bg': "url('../../public/images/login-bg1.jpg')",
        'sign-up-bg': "url('../../public/images/login-bg2.jpg')",
      },
    },
  },
  plugins: [require('daisyui')],
}
