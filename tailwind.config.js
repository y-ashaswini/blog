/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            extend: {
                colors: {
                    dark1: "#232323",
                    dark2: "#535353",
                    light1: "#767676",
                    light2: "#FAFAFA",
                    gold: "#FFBF00",
                },
            },
        },
    },
    plugins: [
        // ...
        require("tailwind-scrollbar")({ nocompatible: true }),
    ],
};
