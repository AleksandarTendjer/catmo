import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongoConnection";

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("catmo");
		const catsCollection = db.collection("cats");

		const topCat = await catsCollection
			.find()
			.sort({ likeCount: -1 })
			.limit(1)
			.toArray();
		console.log(topCat);

		if (topCat.length === 0) {
			return NextResponse.json({ message: "No cats found" }, { status: 404 });
		}

		return NextResponse.json(topCat[0], { status: 200 });
	} catch (error) {
		console.error("Error fetching top cat:", error);
		return NextResponse.json(
			{ message: `Error fetching top cat: ${error}` },
			{ status: 500 }
		);
	}
}
