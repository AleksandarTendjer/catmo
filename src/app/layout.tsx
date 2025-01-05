import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Catmo",
	description: "See real cat images",
	icons: {
		icon: "/assets/imgs/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="min-h-screen flex flex-col bg-gradient-to-br from-frutigerPaleBlue via-frutigerPaleGreen to-frutigerPaleOrange overflow-hidden">
					<div className="flex-grow flex items-center justify-center">
						{children}
						<footer className="absolute bottom-0 z-10 left-0 right-0 text-center text-base py-4 bg-transparent text-slate-400 w-full">
							© 2024{" "}
							<a href="https://alextendjer.com" className="underline">
								Aleksandar Tendjer
							</a>
							. All rights reserved.
						</footer>
					</div>
				</div>
			</body>
		</html>
	);
}
