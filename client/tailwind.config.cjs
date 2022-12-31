/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],

    darkMode: 'class',

    theme: {
        extend: {
            maxWidth: {
                '60Screen': '60%',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
