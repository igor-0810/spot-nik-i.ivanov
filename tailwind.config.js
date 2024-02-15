/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-50": "#F6FAFD",
				"primary-500": "#0073EA",
				"primary-600": "#0060B9",
				"gray-100": "#F9FAFD",
				"gray-150": "#F4F4F6",
				"gray-200": "#E9EEF8",
				"gray-250": "#D1D6E0",
				"gray-300": "#C6C6C6",
				"gray-350": "#B8BDC7",
				"gray-400": "#505050",
				"gray-900": "#171717",
				"opacity-black": "rgba(0,0,0,0.65)",
				"error-300": "#B71106",
			},
		},
	},
	plugins: [],
}
