import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				Catfiles: ['"Catfiles"', "sans-serif"],
				Checkbook: ['"Checkbook"', "sans-serif"],
				Bitwise: ['"Bitwise"', "sans-serif"],
				Prototype: ['"Prototype"', "sans-serif"],
				MarnyRegular: ['"MarnyRegular"', "sans-serif"],
			},
			colors: {
				frutigerPaleBlue: "#E8F8FF",
				frutigerPaleGreen: "#F2FFF9",
				frutigerPaleOrange: "#FFF9F2",
				frutigerBlue: "#3BAFDA",
				frutigerGreen: "#91E4C1",
				frutigerOrange: "#FDB44B",
				frutigerLightBlue: "#AEE3F4", // Between frutigerPaleBlue and frutigerBlue
				frutigerLightGreen: "#C9F6E0", // Between frutigerPaleGreen and frutigerGreen
				frutigerLightOrange: "#FDE2C8", // Between frutigerPaleOrange and frutigerOrange
				frutigerAqua: "#76D8D2", // Between frutigerBlue and frutigerGreen
				frutigerGoldenOrange: "#FFC27E", // Between frutigerOrange and frutigerPaleOrange
				frutigerMint: "#B5EBDB", // Between frutigerGreen and frutigerPaleGreen
			},
			cursor: {
				next: "url('/assets/imgs/next_gif.gif'), auto",
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
