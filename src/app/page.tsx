"use client";

export default function Home() {
	function validate(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (value !== "") {
			if (parseInt(value) < 0) {
				e.target.value = "0";
			} else if (parseInt(value) > 23) {
				e.target.value = "23";
			}
		}
	}

	return (
		<div>
			<div className="p-4">
				<div>Name</div>
				<input className="rounded-lg border-2 border-blue-500 pl-2 pr-2" type="text" />
			</div>
			<div className="p-4">
				<div>Surname</div>
				<input className="rounded-lg border-2 border-blue-500 pl-2 pr-2" type="text" />
			</div>
			<div className="p-4">
				<div>Phone number</div>
				<input className="rounded-lg border-2 border-blue-500 pl-2 pr-2" type="text" />
			</div>
			<div className="flex flex-row flex-wrap gap-4">
				<div className="m-4">
					<div>Check in date</div>
					<input className="h-8 rounded-lg border-2 border-blue-500" type="date" />
				</div>
				<div className="m-4">
					<div>Time (hours) </div>
					<input
						id="number"
						type="number"
						defaultValue="12"
						min="0"
						max="23"
						className="h-8 w-12 rounded-lg border-2 border-blue-500 pl-2"
						onChange={(e) => validate(e)}
					/>
				</div>
			</div>
			<div className="flex flex-row flex-wrap gap-4">
				<div className="m-4">
					<div>Check out date</div>
					<input className="h-8 rounded-lg border-2 border-blue-500" type="date" />
				</div>
				<div className="m-4">
					<div>Time (hours) </div>
					<input
						id="number"
						type="number"
						defaultValue="12"
						min="0"
						max="23"
						className="h-8 w-12 rounded-lg border-2 border-blue-500 pl-2"
						onChange={(e) => validate(e)}
					/>
				</div>
			</div>
		</div>
	);
}
