import { useState } from "react";
import Input from "./Input";

export default function CreateItem() {
	const [task, setTask] = useState("");

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTask(e.target.value);
	}

	return (
		<>
			<header className="">
				<h1 className="text-2xl font-bold">Your Todo</h1>
			</header>
			<div>
				<form>
					<Input
						placeholder={"Add task"}
						value={task}
						key={"TodoInput"}
						onChange={handleInputChange}
					/>
				</form>
			</div>
		</>
	);
}
