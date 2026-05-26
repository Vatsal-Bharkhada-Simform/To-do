import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function CreateItem() {
	const [task, setTask] = useState("");

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTask(e.target.value);
	}

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log("Clicked: ", e);
	}

	return (
		<>
			<header className="">
				<h1 className="text-2xl font-bold">Your Todo</h1>
			</header>
			<div>
				<form onSubmit={handleSubmit}>
					<Input
						placeholder={"Add task"}
						value={task}
						key={"TodoInput"}
						onChange={handleInputChange}
						name="to-do input"
					/>
					<Button
						variant="PRIMARY"
						type="submit"
					>
						Add task
					</Button>
				</form>
			</div>
		</>
	);
}
