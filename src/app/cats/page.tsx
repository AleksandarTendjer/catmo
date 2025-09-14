"use client";
import { Spin, message } from "antd";
import { useState, useEffect } from "react";
import { Cat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DndContext } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
function DraggableTreat() {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "treat",
	});

	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
		: undefined;

	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className="cursor-grab ">
			<Image
				src="/assets/imgs/pate.jpg"
				width={100}
				height={100}
				alt="treat"
				className="rounded-full mb-6 sm:mb-1"
				unoptimized
			/>
		</div>
	);
}

export default function RandomCat() {
	const [catImage, setCatImage] = useState<string | null>(null);
	const [catId, setCatId] = useState<string | null>(null);
	const [messageApi, contextHolder] = message.useMessage();
	const [fed, setFed] = useState<boolean>(false);
	const [firstShow, setFirstShow] = useState<boolean>(true);

	async function fetchRandomCat() {
		try {
			setCatImage(null);
			setCatId(null);
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
		setFed(true);

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
	function DroppableCat() {
		const { setNodeRef, isOver } = useDroppable({ id: "cat" });

		return (
			<div
				ref={setNodeRef}
				className={`relative border-4 ${
					isOver ? "border-green-500" : "border-frutigerLightGreen"
				}`}>
				{catImage ? (
					<Image
						src={`data:image/jpeg;base64,${catImage}`}
						alt="Random Cat"
						width={200}
						height={200}
						className="w-64 h-64 object-cover p-10 hover:cursor-grabbing"
					/>
				) : (
					<Spin size="large" />
				)}
			</div>
		);
	}
	useEffect(() => {
		fetchRandomCat();
		if (firstShow) {
			messageApi.open({
				type: "info",
				icon: <Cat />,
				content: "Drag and drop the pate to the cat to treat the cat!",
				duration: 4,
			});
			setFirstShow(false);
		}
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
			<div className="self-center justify-self-center items-center row-span-11 flex flex-col sm:flex-row w-full justify-between sm:px-20 ">
				{contextHolder}

				<DndContext
					onDragEnd={(event) => {
						if (event.over?.id === "cat" && !fed) {
							petTheCat();
						}
					}}>
					{
						<div className="mt-6 flex justify-center">
							<div className={catImage && catId && fed ? "invisible" : ""}>
								<DraggableTreat />
							</div>
						</div>
					}
					<DroppableCat />
				</DndContext>

				{catImage && catId && (
					<div className="mt-6  sm:mt-1 text-center flex justify-between">
						<button
							onClick={fetchRandomCat}
							className=" rounded-full bg-gradient-to-r from-frutigerBlue to-frutigerGreen  text-xs font-semibold px-2 py-2 text-white shadow-md hover:bg-indigo-500 focus:outline-none">
							<Image
								src={"/assets/imgs/nextcat.gif"}
								alt="pawprint"
								width={80}
								height={80}
								style={{
									maxWidth: "100%",
									height: "auto",
									borderRadius: "0.5rem",
								}}
								className="rounded-md"
							/>{" "}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
