"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function WhichCatAreYou() {
	interface Option {
		text: string;
		value: "A" | "B" | "C" | "D";
	}

	interface Question {
		text: string;
		options: Option[];
	}
	const questions: Question[] = [
		{
			text: "What's your ideal weekend activity?",
			options: [
				{
					text: "Napping and eating snacks all day, it's the weekend isn't it...",
					value: "A",
				},
				{
					text: "Climbing trees, exploring rooftops, full chaos mode",
					value: "B",
				},
				{ text: "Planning Halloween decorations… in July", value: "C" },
				{ text: "Making everyone around me laugh", value: "D" },
			],
		},
		{
			text: "Pick a meal:",
			options: [
				{ text: "Extra cheesy lasagna", value: "A" },
				{ text: "Protein shake and a tuna chaser", value: "B" },
				{ text: "Something black... maybe a charcoal latte?", value: "C" },
				{ text: "A bag of chips I stole from someone else", value: "D" },
			],
		},
		{
			text: "Your vibe in a group chat is:",
			options: [
				{ text: "Reacting with 👍 and disappearing", value: "A" },
				{ text: "Dropping chaotic voice notes at 2am", value: "B" },
				{ text: "Sharing cryptic memes", value: "C" },
				{ text: "Spamming GIFs and dad jokes", value: "D" },
			],
		},
		{
			text: "What's your go-to fashion statement?",
			options: [
				{ text: "Cozy oversized hoodie", value: "A" },
				{ text: "Workout gear", value: "B" },
				{ text: "Cloaks, vintage rings", value: "C" },
				{ text: "Mismatched socks and sunglasses indoors", value: "D" },
			],
		},
		{
			text: "Pick a soundtrack for your life:",
			options: [
				{
					text: "Lo-fi beats, Atmospheric DNB or something to chill to",
					value: "A",
				},
				{ text: "Techno sets from NTS/Soundcloud", value: "B" },
				{ text: "Ambient", value: "C" },
				{ text: "Cartoon sound effects", value: "D" },
			],
		},
	];
	const resultMap = {
		A: "Couch Potato Cat 😸 (chonky, chill, snack-obsessed)",
		B: "Energetic Parkour Cat 🧗‍♂️ (zoomies 24/7)",
		C: "Mysterious Spooky Cat 🕸️ (elegant and a bit eerie)",
		D: "Goofy Clown Cat 🤪 (endlessly entertaining)",
	};
	const [answers, setAnswers] = useState<(null | "A" | "B" | "C" | "D")[]>(
		Array(questions.length).fill(null)
	);
	const [result, setResult] = useState<string | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleChange = (
		questionIndex: number,
		value: "A" | "B" | "C" | "D"
	) => {
		const newAnswers = [...answers];
		newAnswers[questionIndex] = value;
		setAnswers(newAnswers);
	};

	return (
		<div className="w-full min-h-screen grid grid-cols-1 grid-rows-12 items-center ">
			<Link className="w-full row-span-1 col-span-1" href={"/"}>
				<Image
					src={"/assets/imgs/back.gif"}
					width={100}
					height={100}
					alt="back-button"
					className="left-10 align-top items-baseline p-5"
				/>
			</Link>
			<div
				className="  self-center justify-self-center row-span-11 py-5 px-5 sm:p-10 bg-[url(/assets/imgs/bgQuizForm.png)]    sm:min-w-80 w-80 bg-clip-border bg-no-repeat bg-contain "
				style={{ width: "80vw", maxWidth: "400px", aspectRatio: "3/4" }}>
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ duration: 0.4 }}
						className=" rounded text-blue-600 text-opacity-65">
						<div className="text-sm sm:text-base">
							<p className="font-semibold  mb-2">
								{questions[currentIndex].text}
							</p>
							{questions[currentIndex].options.map((opt, i) => (
								<label key={i} className="block mb-1">
									<input
										type="radio"
										name={`question-${currentIndex}`}
										value={opt.value}
										checked={answers[currentIndex] === opt.value}
										onChange={() => handleChange(currentIndex, opt.value)}
										className="mr-2"
									/>
									{opt.text}
								</label>
							))}
							<div className="flex justify-center mt-1 sm:mt-4">
								<button
									onClick={() => {
										if (currentIndex < questions.length - 1) {
											setCurrentIndex(currentIndex + 1);
										} else {
											const count: Record<"A" | "B" | "C" | "D", number> = {
												A: 0,
												B: 0,
												C: 0,
												D: 0,
											};
											answers.forEach((ans) => {
												if (ans) count[ans]++;
											});
											const mostCommon = (
												Object.keys(count) as ("A" | "B" | "C" | "D")[]
											).reduce((a, b) => (count[a] > count[b] ? a : b));
											setResult(resultMap[mostCommon]);
										}
									}}
									disabled={!answers[currentIndex]}
									className=" bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50">
									{currentIndex === questions.length - 1
										? "See Result"
										: "Next"}
								</button>
							</div>
							{result && (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4 }}
									className="mt-6 p-4 bg-gray-100 rounded shadow">
									<h2 className="text-xl font-bold mb-2">Your Cat Match:</h2>
									<p>{result}</p>
									<img
										src="/cute-cat.png"
										alt="Cat result"
										className="mt-4 rounded"
									/>
								</motion.div>
							)}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
