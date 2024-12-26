import { InsertRoom } from "../../../lib/querries";
import { NextResponse } from "next/server";
import type { Room } from "../../../types/db/rooms";

export async function POST(request: Request) {
	try {
		const { name, floornum, bednum } = await request.json();
		const room: Room = { name, floornum, bednum };
		await InsertRoom(room);
		return NextResponse.json({ message: "Room added successfully" });
	} catch (error) {
		return NextResponse.json({ error: "Failed to add room, error" + error });
	}
}
