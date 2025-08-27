"use client";
import { Spin, message } from "antd";
import { useState, useEffect } from "react";
import { Cat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RandomCat() {
	const [catImage, setCatImage] = useState<string | null>(null);
	const [catId, setCatId] = useState<string | null>(null);
	const [messageApi, contextHolder] = message.useMessage();
	const [fed, setFed] = useState<boolean>(false);
	async function fetchRandomCat() {
		try {
			const response = await fetch("/api/randomCat");
			if (response.ok) {
				const data = await response.json();
				setCatImage(data.image);
				setCatId(data._id);
				setFed(false);
			} else {
				console.error("Failed to fetch random cat");
			}
		} catch (error) {
			console.error("Error fetching random cat:", error);
		}
	}
	async function petTheCat() {
		if (!catId) return;

		try {
			const response = await fetch(`/api/randomCat/${catId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				setFed(true);
				console.log(fed);
				await response.json();
				messageApi.open({
					type: "success",
					icon: <Cat />,
					content: "Meeeeow !",
				});
			} else {
				console.error("Failed to pet the cat");
			}
		} catch (error) {
			console.error("Error petting the cat:", error);
		}
	}

	useEffect(() => {
		fetchRandomCat();
	}, []);

	return (
		<div className="w-full min-h-screen grid grid-cols-1 grid-rows-12 items-center">
			<Link className="w-full row-span-1 col-span-1" href={"/"}>
				<Image
					src={"/assets/imgs/back.gif"}
					width={100}
					height={100}
					alt="back-button"
					className="left-10 align-top items-baseline p-5"
				/>
			</Link>
			<div className="self-center justify-self-center row-span-11 ">
				<img
					src={"/assets/imgs/catRacing.gif"}
					className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full h-auto"
				/>
				<div className="relative border-4 border-x-frutigerLightGreen border-y-frutigerLightBlue">
					{contextHolder}

					{catImage ? (
						<img
							src={`data:image/jpeg;base64,${catImage}`}
							alt="Random Cat"
							style={{ maxWidth: "100%", height: "auto" }}
							className="w-64 h-64 object-cover  p-10 border-white hover:cursor-grab"
						/>
					) : (
						<Spin size="large" />
					)}
				</div>
				{catImage && catId && (
					<div className="mt-4 text-center flex justify-between">
						<button
							onClick={petTheCat}
							disabled={fed}
							className={`mt-2 rounded-md  ${
								fed
									? "bg-gray-400 cursor-not-allowed"
									: "bg-gradient-to-r from-frutigerAqua via-frutigerGreen to-frutigerOrange hover:bg-indigo-500"
							} px-2 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none `}>
							Deserves a treat! 🍖
						</button>

						<button
							onClick={fetchRandomCat}
							className="mt-2 rounded-md bg-gradient-to-r from-frutigerBlue to-frutigerGreen  text-xs font-semibold px-2 py-2 text-white shadow-md hover:bg-indigo-500 focus:outline-none">
							Next Furball 🐾
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
