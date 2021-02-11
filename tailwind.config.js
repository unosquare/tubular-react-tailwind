module.exports = {
    purge: {
        enabled: false,
        content: ['./src/**/*.tsx'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('@tailwindcss/forms')],
};
