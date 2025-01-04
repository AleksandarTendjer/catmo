export const maxDuration = 10;
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongoConnection";
import { ObjectId } from "mongodb";

export async function PUT(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.pathname.split("/").pop();

		if (!id) {
			return NextResponse.json(
				{ message: "Cat ID not provided" },
				{ status: 400 }
			);
		}
		const client = await clientPromise;
		const db = client.db("catmo");
		const catsCollection = db.collection("cats");

		const result = await catsCollection.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{ $inc: { likeCount: 1 } },
			{ returnDocument: "after" }
		);
		if (result?.image) {
			return NextResponse.json(
				{ likeCount: result.likeCount },
				{ status: 200 }
			);
		} else {
			return NextResponse.json({ message: "Cat not found" }, { status: 404 });
		}
	} catch (error) {
		console.error("Error updating like count:", error);
		return NextResponse.json(
			{ message: `Error updating like count: ${error}` },
			{ status: 500 }
		);
	}
}
