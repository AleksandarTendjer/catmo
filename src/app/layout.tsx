import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

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
				<div className="min-h-screen flex flex-col  overflow-hidden relative">
					<Image
						src="/assets/imgs/bird.gif"
						alt="star"
						width={40}
						height={40}
						className="absolute bottom-2 left-2"
					/>
					<Image
						src="/assets/imgs/bug.gif"
						alt="star"
						width={40}
						height={40}
						className="absolute bottom-2 right-2"
					/>
					<div className="flex-grow flex items-center justify-center bg-blue-300/70 ">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
