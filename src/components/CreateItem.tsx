import { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { ToDoContext } from "../context/ToDoContext";

export default function CreateItem() {
	const [task, setTask] = useState("");
	const { dispatch } = useContext(ToDoContext);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTask(e.target.value);
	}

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log("Clicked: ", e);

		if (task === "") {
			alert("Cannot create empty task");
			return;
		}

		setTask("");

		dispatch({
			type: "ADD",
			payload: {
				id: -1, // Placeholder id as reducer would dynamically provide id
				title: task,
				status: "PENDING",
				createdAt: new Date(),
			},
		});
	}

	return (
		<div className="w-150 max-w-full flex flex-col gap-4 sticky top-0 bg-white z-20 pt-20 pb-4">
			<header className="">
				<h1 className="text-4xl font-extrabold">Your Todo</h1>
			</header>
			<div>
				<form
					onSubmit={handleSubmit}
					className="p-2 rounded-4xl flex flex-row gap-2 bg-gray-100"
				>
					<Input
						placeholder={"Add task"}
						value={task}
						key={"TodoInput"}
						onChange={handleInputChange}
						name="to-do-input"
						className="rounded-4xl w-full"
					/>
					<Button variant="PRIMARY" type="submit">
						Add task
					</Button>
				</form>
			</div>
		</div>
	);
}
