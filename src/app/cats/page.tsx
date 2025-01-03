"use client";
import { Spin, message } from "antd";
import { useState, useEffect } from "react";

export default function RandomCat() {
	const [catImage, setCatImage] = useState<string | null>(null);
	const [catId, setCatId] = useState<string | null>(null);
	const [messageApi, contextHolder] = message.useMessage();

	async function fetchRandomCat() {
		try {
			const response = await fetch("/api/randomCat");
			if (response.ok) {
				const data = await response.json();
				setCatImage(data.image);
				setCatId(data._id);
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
				await response.json();
				messageApi.open({
					type: "success",
					content: "The cat is pet!",
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
		<div className="relative">
			{contextHolder}
			<div
				className="absolute inset-0 m-auto w-[300px] h-[300px] rounded-full bg-gradient-to-r from-frutigerBlue via-frutigerGreen to-frutigerOrange animate-gradient bg-[length:200%_200%]"
				style={{
					zIndex: -1,
				}}></div>
			{catImage ? (
				<img
					src={`data:image/jpeg;base64,${catImage}`}
					alt="Random Cat"
					style={{ maxWidth: "100%", height: "auto" }}
					className="w-64 h-64 object-cover rounded-full border-4 border-white hover:cursor-pointer"
					onClick={fetchRandomCat}
				/>
			) : (
				<Spin size="large" />
			)}

			{catImage && catId && (
				<div className="mt-4 text-center">
					<button
						onClick={petTheCat}
						className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none">
						Pet the Cat 🐾
					</button>
				</div>
			)}
		</div>
	);
}
