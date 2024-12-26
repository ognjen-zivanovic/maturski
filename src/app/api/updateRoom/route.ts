import { UpdateRoom } from "../../../lib/querries";
import { NextResponse } from "next/server";
import type { Room } from "../../../types/db/rooms";

export async function POST(request: Request) {
	try {
		const { id, name, floornum, bednum } = await request.json();
		const room: Room = { id, name, floornum, bednum };
		await UpdateRoom(room);
		return NextResponse.json({ message: "Room updated successfully" });
	} catch (error) {
		return NextResponse.json({ error: "Failed to update room" });
	}
}
