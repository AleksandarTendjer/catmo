"use client";
import Image from "next/image";
import { InView } from "./components/InView";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Spin } from "antd";
type Cat = {
	_id: string;
	name?: string;
	image?: string;
	likeCount?: number;
};
export default function Home() {
	const [catOfTheMonth, setCatOfTheMonth] = useState<Cat | null>(null);

	useEffect(() => {
		const fetchTopCat = async () => {
			try {
				const res = await fetch("/api/cats/top");
				if (!res.ok) throw new Error("Failed to fetch top cat");
				const data = await res.json();
				setCatOfTheMonth(data);
			} catch (err) {
				console.error("Error fetching cat of the month:", err);
			}
		};
		fetchTopCat();
	}, []);

	return (
		<div className="flex  flex-col   items-center justify-center p-10">
			<div className=" mx-auto max-w-2xl ">
				<div className="justify-center flex flex-col py-10 ">
					<Image
						src={"/assets/imgs/anibutterfly2.gif"}
						alt={"butterfly"}
						width={100}
						height={100}
						className="shadow-none rounded-lg w-full h-10"
						unoptimized
					/>{" "}
					<div className="flex flex-row w-full justify-center text-center py-12 sm:py-48 lg:py-36">
						<Image
							src={"/assets/imgs/carwalk1.gif"}
							alt={"exclamation"}
							width={30}
							height={30}
							className="shadow-sm rounded-lg"
							unoptimized
						/>{" "}
						<motion.h1
							animate={{ scale: [1, 1.04, 1] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className=" text-xl sm:text-6xl lg:text-7xl font-Catfiles font-semibold tracking-tight   uppercase whitespace-nowrap  text-[#660b31b6]">
							Welcome to Catmo, friend{" "}
						</motion.h1>
						<Image
							src={"/assets/imgs/carwalk2.gif"}
							alt={"exclamation"}
							width={30}
							height={30}
							className="shadow-sm rounded-lg"
							unoptimized
						/>{" "}
					</div>
					<motion.p className="p-5 mt-10 text-center flex flex-row font-semibold text-xl font-Prototype  bg-black/20 rounded-lg  text-[#660b31b6]/90">
						{" "}
						A whimsical wrold where goofy cats are stars - you give them treats,
						and the most treated one shines as the Cat of the Month
					</motion.p>
				</div>
			</div>

			<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-20">
				<InView
					variants={{
						hidden: {
							opacity: 0,
							x: 100,
						},
						visible: {
							opacity: 1,
							x: 0,
						},
					}}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					viewOptions={{ margin: "0px 0px -350px 0px" }}>
					<div className="text-center ">
						{catOfTheMonth ? (
							<div className=" bg-opacity-50  bg-gradient-to-r from-[#427AA1] to-[#EBF2FA] via-[#427AA1]  animate-gradient bg-[length:200%_200%] rounded-lg shadow-lg shadow-slate-500 mt-10">
								<div className="p-10 justify-center flex flex-col">
									<h1 className=" text-xl  font-semibold tracking-tight text-center w-full font-Catfiles text-[#660b31b6]">
										Meet our Cat of the Month
									</h1>

									<div>
										<Image
											src={
												`data:image/jpeg;base64,${catOfTheMonth?.image}` ||
												"/assets/imgs/larry.gif"
											}
											alt={"CatOfTheMonthimage"}
											width={500}
											height={800}
											className="lg:mt-5 shadow-sm rounded-lg p-10"
											unoptimized
										/>
										<p className="mt-4 text-lg  w-full justify-center text-center flex flex-row font-semibold text-white/90">
											<Image
												src={"/assets/imgs/birthday.gif"}
												alt={"larry"}
												width={20}
												height={10}
												className="shadow-sm rounded-lg mr-4"
												unoptimized
											/>
											treated {catOfTheMonth?.likeCount ?? 0} times
											<Image
												src={"/assets/imgs/party1.gif"}
												alt={"larry"}
												width={20}
												height={10}
												className="shadow-sm rounded-lg ml-4"
												unoptimized
											/>
										</p>
									</div>
								</div>
							</div>
						) : (
							<Spin size="large" />
						)}
					</div>
				</InView>
			</div>
			<div className="  mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<InView
					variants={{
						hidden: {
							opacity: 0,
							scale: 1.5,
						},
						visible: {
							opacity: 1,
							scale: 1,
						},
					}}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					viewOptions={{ margin: "0px 0px -350px 0px" }}>
					<div className="text-center ">
						<h1 className="	 font-Prototype w-full whitespace-break-spaces font-semibold tracking-tight  sm:text-5xl text-white/70">
							Now there friend, your journey starts with a choice...
						</h1>

						<div className="mt-10 flex flex-row w-full items-center justify-between gap-x-6">
							<motion.a
								href="/cats"
								whileHover={{ scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
								className="text-[#1616acb6] text-lg whitespace-break-spaces text-center justify-center flex flex-col items-center">
								{" "}
								<Image
									src={"/assets/imgs/catBowl.gif"}
									alt={"catBowl"}
									width={200}
									height={200}
									className="lg:mt-5  rounded-lg p-10 font-Prototype"
								/>
								<p className=" font-Prototype">
									Take the blue pill to stay in wonderland - scroll cats
								</p>
							</motion.a>
							<motion.a
								href="/catquiz"
								whileHover={{ scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
								className="text-[#660b31b6] text-lg  tracking-tight whitespace-break-spaces text-center justify-center flex flex-col items-center">
								<Image
									src={"/assets/imgs/catInBox.gif"}
									alt={"catInBox"}
									width={200}
									height={200}
									className="lg:mt-5 rounded-lg p-10  "
									unoptimized
								/>
								<p className=" font-Prototype">
									{" "}
									Take the red pill to see how far the rabbit hole goes - do a
									catquiz
								</p>
							</motion.a>
						</div>
					</div>
				</InView>
			</div>
		</div>
	);
}
