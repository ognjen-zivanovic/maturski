"use client";

import { useEffect, useState } from "react";
import type { Room } from "../../types/db/rooms";

function bedSVG() {
	return (
		<svg
			className="h-6 w-6 text-blue-700"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M18 17v2M12 5.5V10m-6 7v2m15-2v-4c0-1.6569-1.3431-3-3-3H6c-1.65685 0-3 1.3431-3 3v4h18Zm-2-7V8c0-1.65685-1.3431-3-3-3H8C6.34315 5 5 6.34315 5 8v2h14Z"
			/>
		</svg>
	);
}

enum Action {
	None,
	AddRoom,
	EditRoom,
}

// with the typescript type

export default function Admin() {
	const [rooms, setRooms] = useState<Record<number, Room[]>>({});

	const [id, setId] = useState<string | undefined>();
	const [name, setName] = useState<string>("");
	const [floornum, setFloornum] = useState<number>(0);
	const [bednum, setBednum] = useState<number>(0);
	const [action, setAction] = useState<Action>(Action.None);

	function handleRoomClick(room: Room) {
		setAction(Action.EditRoom);
		setId(room.id!);
		setName(room.name);
		setFloornum(room.floornum);
		setBednum(room.bednum);
	}

	function handleAddRoomClick() {
		setAction(Action.AddRoom);
		setId(undefined);
		setName("");
		setFloornum(0);
		setBednum(0);
	}
	const handleAddRoom = async (e: React.FormEvent) => {
		e.preventDefault();

		const roomData = {
			name,
			floornum: floornum,
			bednum: bednum,
		};

		const response = await fetch("/api/insertRoom", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(roomData),
		});

		await response.json();
	};

	const handleEditRoom = async (e: React.FormEvent) => {
		e.preventDefault();

		const roomData = {
			id,
			name,
			floornum: floornum,
			bednum: bednum,
		};

		const response = await fetch("/api/updateRoom", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(roomData),
		});

		await response.json();
	};

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/getRooms");
			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}
			const result = await response.json();
			const groupedByFloor: Record<number, Room[]> = result.reduce((acc, item) => {
				const { floornum } = item;
				if (!acc[floornum]) {
					acc[floornum] = [];
				}
				acc[floornum].push(item);
				return acc;
			}, {});

			console.log("-----------------------------------");
			setRooms(groupedByFloor);
		}

		fetchData();
	}, []);

	return (
		<div className="flex h-screen w-screen flex-row bg-slate-100 text-blue-700">
			<div className="flex-1">
				<button onClick={handleAddRoomClick}>Add room</button>
				{Object.entries(rooms).map(([floor, rooms]) => (
					<div key={floor} className="m-4">
						<div className="font-bold">{"Floor " + floor}</div>
						<div className="flex flex-row flex-wrap gap-4">
							{rooms.map((roomInfo) => (
								<button
									onClick={() => handleRoomClick(roomInfo)}
									key={roomInfo.name}
								>
									<div className="flex h-16 w-16 flex-col justify-evenly rounded-lg border-2 border-blue-500 bg-gray-100">
										<div className="text-center">{roomInfo.name}</div>
										<div className="flex flex-row items-center justify-evenly">
											<div>{roomInfo.bednum}</div>
											{bedSVG()}
										</div>
									</div>
								</button>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="w-72 bg-slate-300">
				{
					//input boxes for room number and floor
					(action === Action.EditRoom || action === Action.AddRoom) && (
						<div className="p-4">
							<div className="font-bold">Room {id}</div>

							<div className="m-4">
								<div>Room</div>
								<input
									className="rounded-lg border-2 border-blue-500"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="m-4">
								<div>Beds</div>
								<input
									className="rounded-lg border-2 border-blue-500"
									type="number"
									value={bednum}
									onChange={(e) => setBednum(Number(e.target.value))}
								/>
							</div>
							<div className="m-4">
								<div>Floor</div>
								<input
									className="rounded-lg border-2 border-blue-500"
									type="text"
									value={floornum}
									onChange={(e) => setFloornum(Number(e.target.value))}
								/>
							</div>
							{action === Action.AddRoom && (
								<button onClick={handleAddRoom}>Add</button>
							)}
							{action === Action.EditRoom && (
								<button onClick={handleEditRoom}>Edit</button>
							)}
						</div>
					)
				}
			</div>
		</div>
	);
}
