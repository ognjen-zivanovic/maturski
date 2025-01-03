import { GetRooms } from "../../../lib/querries";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const rooms = await GetRooms();
		return NextResponse.json(rooms);
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch rooms, error: " + error });
	}
}
