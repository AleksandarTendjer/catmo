"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "antd";

export default function WhichCatAreYou() {
	interface Option {
		text: string;
		value: "A" | "C" | "D" | "E" | "F";
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
				{ text: "Planning Halloween decorations… in July", value: "C" },
				{ text: "Making everyone around me laugh", value: "D" },
				{
					text: "High tea at noon, grooming myself until I sparkle",
					value: "E",
				},
				{
					text: "Scavenging, exploring, sidequesting",
					value: "F",
				},
			],
		},
		{
			text: "Pick a meal:",
			options: [
				{ text: "Extra cheesy lasagna", value: "A" },
				{ text: "Something black... maybe a charcoal latte?", value: "C" },
				{ text: "A bag of chips I stole from someone else", value: "D" },
				{ text: "Delicate tuna tartare served on fine china", value: "E" },
				{
					text: "Whatever I can find — half a sandwich, leftovers in a box",
					value: "F",
				},
			],
		},
		{
			text: "Your vibe in a group chat is:",
			options: [
				{ text: "Reacting with 👍 and disappearing", value: "A" },
				{ text: "Sharing memes no one gets", value: "C" },
				{ text: "Spamming GIFs and reels", value: "D" },
				{ text: "Elegant one-liners, perfectly placed emojis 🌹", value: "E" },
				{
					text: "Rarely online, but when I show up it’s with wild stories",
					value: "F",
				},
			],
		},
		{
			text: "What's your go-to fashion statement?",
			options: [
				{ text: "Oversized,oversized,oversized !", value: "A" },
				{ text: "Something black...a cloak, boots", value: "C" },
				{ text: "Mismatched socks and sunglasses indoors", value: "D" },
				{
					text: "Poshy, white shirt, pink or brown skirt/pants, loafers",
					value: "E",
				},
				{ text: "First thing that shows up in the wardrobe", value: "F" },
			],
		},
	];

	const resultMap = {
		A: "Couch Potato Cat 😸 (chonky, chill, snack-obsessed)",
		C: "Mysterious Spooky Cat 🕸️ (elegant and a bit eerie)",
		D: "Goofy Clown Cat 🤪 (endlessly entertaining)",
		E: "Elegant Posh Cat 💎 (graceful, clean, classy — basically feline royalty)",
		F: "Stray Survivor Cat 🐾 (scrappy, resourceful, and charmingly street-smart)",
	};
	const [answers, setAnswers] = useState<
		(null | "A" | "C" | "D" | "E" | "F")[]
	>(Array(questions.length).fill(null));
	const [result, setResult] = useState<string | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleChange = (
		questionIndex: number,
		value: "A" | "C" | "D" | "E" | "F"
	) => {
		const newAnswers = [...answers];
		newAnswers[questionIndex] = value;
		setAnswers(newAnswers);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="w-full min-h-screen grid grid-cols-1 grid-rows-14 items-center ">
			<Link className="w-full row-span-1 col-span-1" href={"/"}>
				<Image
					src={"/assets/imgs/back.gif"}
					width={100}
					height={100}
					alt="next-button"
					className="left-10 align-top items-baseline p-5"
				/>
			</Link>
			<div className="self-center justify-self-center flex row-span-1">
				<h1 className="font-semibold font-Prototype text-lg text-slate-500">
					{questions[currentIndex].text}
				</h1>
			</div>
			<div
				className=" self-center justify-self-center flex flex-col row-span-10 py-5 px-5 sm:p-10 bg-[url(/assets/imgs/bgQuizForm.png)]  sm:min-w-80 w-80 bg-clip-border bg-no-repeat bg-contain"
				style={{ width: "80vw", maxWidth: "400px" }}>
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ duration: 0.4 }}
						className=" rounded text-blue-600 text-opacity-65 p-5">
						<div className="text-sm ">
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
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="col-span-1 row-span-1 justify-center items-center flex">
				<Modal title="Your Cat Match:" open={isModalOpen} onOk={handleOk}>
					<p>{result}</p>
					<img src="/cute-cat.png" alt="Cat result" className="mt-4 rounded" />
				</Modal>{" "}
				<button
					onClick={() => {
						if (currentIndex < questions.length - 1) {
							setCurrentIndex(currentIndex + 1);
						} else {
							const count: Record<"A" | "C" | "D" | "E" | "F", number> = {
								A: 0,
								C: 0,
								D: 0,
								E: 0,
								F: 0,
							};
							answers.forEach((ans) => {
								if (ans) count[ans]++;
							});
							const mostCommon = (
								Object.keys(count) as ("A" | "C" | "D")[]
							).reduce((a, b) => (count[a] > count[b] ? a : b));
							setResult(resultMap[mostCommon]);
							showModal();
						}
					}}
					disabled={!answers[currentIndex]}
					className=" bg-purple-600 opacity-60 text-white  mt-10 py-2 rounded  disabled:opacity-30">
					{currentIndex === questions.length - 1 ? (
						"See Result"
					) : (
						<Image
							src="/assets/imgs/nextArrowGreen.gif"
							width={100}
							height={100}
							alt="next"
						/>
					)}
				</button>
			</div>
			<div className="row-span-1 col-span-1 flex items-center justify-center">
				<Image
					src={"/assets/imgs/catThinking.gif"}
					width={100}
					height={100}
					alt="cat thinking"
					className="align-top self-center  p-5"
				/>
			</div>
		</div>
	);
}
