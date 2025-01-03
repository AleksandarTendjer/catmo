export const maxDuration = 10;
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongoConnection";

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("catmo");
		const catsCollection = db.collection("cats");

		const totalCats = await catsCollection.countDocuments();

		if (totalCats === 0) {
			return NextResponse.json(
				{ message: "No cats found in the database." },
				{ status: 404 }
			);
		}

		const randomIndex = Math.floor(Math.random() * totalCats);

		const randomCat = await catsCollection.findOne({}, { skip: randomIndex });

		return NextResponse.json(randomCat, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: `Server error: ${error}` },
			{ status: 500 }
		);
	}
}
