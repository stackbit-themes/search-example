const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*'],
    plugins: [require('daisyui'), require('@tailwindcss/line-clamp')]
};
