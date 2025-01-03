import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				frutigerPaleBlue: "#E8F8FF",
				frutigerPaleGreen: "#F2FFF9",
				frutigerPaleOrange: "#FFF9F2",
				frutigerBlue: "#3BAFDA",
				frutigerGreen: "#91E4C1",
				frutigerOrange: "#FDB44B",
			},
			backgroundImage: {
				"gradient-to-via":
					"linear-gradient(to right, var(--tw-gradient-stops))",
			},
			animation: {
				float: "float 10s ease-in-out infinite",
				gradient: "gradientShift 6s ease infinite",
			},
			keyframes: {
				gradientShift: {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-20px)" },
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
