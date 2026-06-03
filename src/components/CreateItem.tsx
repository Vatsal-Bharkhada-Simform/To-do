import { useContext, useState } from "react";
import { ToDoContext } from "../context/ToDoContext";
import type { FilterOptions } from "../types/to_do_type";
import Input from "./Input";
import Button from "./Button";
import Dropdown from "./Dropdown";

const filters: Array<FilterOptions> = ["All", "Completed", "Incomplete"];

export default function CreateItem() {
	const [task, setTask] = useState("");

	const { dispatch, filterOptions, setFilterOptions } =
		useContext(ToDoContext);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTask(e.target.value);
	}

	function handleFilterChange(newValue: string) {
		setFilterOptions(newValue);
	}

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

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
		<div className="w-150 max-w-full flex flex-col gap-4 sticky top-0 bg-white z-20 pt-20">
			<header className="">
				<h1 className="text-4xl font-extrabold">Your Todo</h1>
			</header>
			<div className="flex flex-col gap-4">
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
						title="Task input"
						className="rounded-4xl w-full"
					/>
					<Button variant="PRIMARY" type="submit">
						Add task
					</Button>
				</form>
				<div className="w-full">
					<Dropdown
						options={filters}
						value={filterOptions}
						onChange={handleFilterChange}
					/>
				</div>
			</div>
		</div>
	);
}
