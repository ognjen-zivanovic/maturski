"use client";

import { useState } from "react";

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

// with the typescript type

const rooms = [
	{
		floorNum: "1",
		rooms: [
			{ id: "101", beds: 3 },
			{ id: "102", beds: 2 },
			{ id: "103", beds: 1 },
			{ id: "104", beds: 1 },
			{ id: "105", beds: 3 },
			{ id: "106", beds: 2 },
			{ id: "107", beds: 1 },
			{ id: "108", beds: 2 },
			{ id: "109", beds: 1 },
			{ id: "110", beds: 3 },
		],
	},
	{
		floorNum: "2",
		rooms: [
			{ id: "201", beds: 1 },
			{ id: "202", beds: 3 },
			{ id: "203", beds: 2 },
			{ id: "204", beds: 1 },
			{ id: "205", beds: 2 },
			{ id: "206", beds: 1 },
			{ id: "207", beds: 3 },
			{ id: "208", beds: 3 },
			{ id: "209", beds: 2 },
		],
	},
	{
		floorNum: "3",
		rooms: [
			{ id: "301", beds: 1 },
			{ id: "302", beds: 2 },
			{ id: "303", beds: 3 },
			{ id: "304", beds: 1 },
			{ id: "305", beds: 2 },
			{ id: "306", beds: 1 },
		],
	},
	{
		floorNum: "4",
		rooms: [
			{ id: "401", beds: 1 },
			{ id: "402", beds: 2 },
			{ id: "403", beds: 3 },
			{ id: "404", beds: 1 },
			{ id: "405", beds: 2 },
			{ id: "406", beds: 1 },
			{ id: "407", beds: 3 },
			{ id: "408", beds: 3 },
			{ id: "409", beds: 2 },
		],
	},
];

export default function Admin() {
	const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

	function handleRoomClick(roomId: string) {
		setSelectedRoom(roomId);
	}

	return (
		<div className="flex h-screen w-screen flex-row bg-slate-100 text-blue-700">
			<div className="flex-1">
				<button>Add room</button>
				{rooms.map((floorInfo) => (
					<div key={floorInfo.floorNum} className="m-4">
						<div className="font-bold">{"Floor " + floorInfo.floorNum}</div>
						<div className="flex flex-row flex-wrap gap-4">
							{floorInfo.rooms.map((roomInfo) => (
								<button
									onClick={() => handleRoomClick(roomInfo.id)}
									key={roomInfo.id}
								>
									<div className="flex h-16 w-16 flex-col justify-evenly rounded-lg border-2 border-blue-500 bg-gray-100">
										<div className="text-center">{roomInfo.id}</div>
										<div className="flex flex-row items-center justify-evenly">
											<div>{roomInfo.beds}</div>
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
					selectedRoom && (
						<div className="p-4">
							<div className="font-bold">Room {selectedRoom}</div>

							<div className="m-4">
								<div>Room</div>
								<input
									className="rounded-lg border-2 border-blue-500"
									type="text"
								/>
							</div>
							<div className="m-4">
								<div>Beds</div>
								<input
									className="rounded-lg border-2 border-blue-500"
									type="number"
								/>
							</div>
							<div className="m-4">
								<div>Floor</div>
								<input
									className="rounded-lg border-2 border-blue-500"
									type="text"
								/>
							</div>
						</div>
					)
				}
			</div>
		</div>
	);
}
