import { neon } from "@neondatabase/serverless";
import type { Room } from "../types/db/rooms";

const sql = neon(process.env.DATABASE_URL!);

export async function GetRooms() {
	const posts = await sql("SELECT * FROM rooms");

	return posts;
}

export async function InsertRoom(room: Room) {
	await sql("INSERT INTO rooms (name, floornum, bednum) VALUES ($1, $2, $3)", [
		room.name,
		room.floornum,
		room.bednum,
	]);
}

export async function UpdateRoom(room: Room) {
	await sql("UPDATE rooms SET name = $1, floornum = $2, bednum = $3 WHERE id = $4", [
		room.name,
		room.floornum,
		room.bednum,
		room.id,
	]);
}
