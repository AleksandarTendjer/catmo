"use client";
import { useState, useEffect } from "react";
interface Bubble {
	id: number;
	catImage: string;
	top: number;
	left: number;
	animationDelay: number;
}
export default function Home() {
	const [bubbles, setBubbles] = useState<Bubble[]>([]);

	useEffect(() => {
		// Array of cat images
		const catImages = [
			"assets/imgs/cat1.jpg",
			"assets/imgs/cat2.jpg",
			"assets/imgs/cat3.jpg",
			"assets/imgs/cat4.jpg",
		];

		// Generate bubble positions
		const generateBubbles = () => {
			return Array.from({ length: 4 }, (_, i) => ({
				id: i,
				catImage: catImages[i % catImages.length],
				top: Math.random() * 100, // Random top position
				left: Math.random() * 100, // Random left position
				animationDelay: Math.random() * 5, // Random animation delay
			}));
		};

		setBubbles(generateBubbles());
	}, []);
	return (
		<div className="relative">
			{bubbles.map((bubble) => (
				<div
					key={bubble.id}
					className="absolute animate-float"
					style={{
						top: `${bubble.top}%`,
						left: `${bubble.left}%`,
						animationDelay: `${bubble.animationDelay}s`,
					}}>
					<div className="relative w-32 h-32">
						<img
							src="assets/imgs/bubble.png" // Your bubble image path
							alt="Bubble"
							className="absolute inset-0 w-full h-full"
						/>
						<img
							src={bubble.catImage}
							alt="Cat in Bubble"
							className="absolute inset-0 m-auto w-20 h-20 object-cover rounded-full"
						/>
					</div>
				</div>
			))}
			<div
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				aria-hidden="true">
				<div
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}></div>
			</div>
			<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div className="text-center">
					<h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
						Feeling stuck or uninspired?
					</h1>
					<p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
						Bored at your job, waiting for something, or not feeling your best?
						Look at some cats, and maybe it will get better. At the very least,
						the time will pass! :)
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<a
							href="/cats"
							className="rounded-md bg-frutigerAqua px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							See Random Cats
						</a>
					</div>
				</div>
			</div>
			<div
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true">
				<div
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}></div>
			</div>
		</div>
	);
}
