import { useContext, useState } from "react";
import { ToDoContext } from "../context/ToDoContext";
import type { FilterOptions } from "../types/to_do_type";
import isValidToDo from "../utils/validateInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const filters: Array<FilterOptions> = ["All", "Completed", "Incomplete"];

export default function CreateItem() {
	const [error, setError] = useState("");

	const { dispatch, filterOptions, setFilterOptions } =
		useContext(ToDoContext);

	function handleFilterChange(newValue: string) {
		setFilterOptions(newValue as FilterOptions);
	}

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");

		const formData = new FormData(e.currentTarget);
		const task = formData.get("to-do-input");

		if (typeof task !== "string") return;

		if (!isValidToDo(task)) {
			setError("Please enter a valid input");
			return;
		}

		dispatch({
			type: "ADD",
			payload: {
				id: "dummy_id", // Placeholder id as reducer would dynamically provide id
				title: task.trim(),
				status: "PENDING",
				createdAt: new Date(),
			},
		});

		e.currentTarget.reset();
	}

	return (
		<div className="w-150 max-w-full flex flex-col gap-4 sticky top-0 bg-white z-20 pt-20">
			<header className="mb-3">
				<h1 className="text-4xl font-extrabold">Your Todo</h1>
			</header>
			<div className="flex flex-col gap-4">
				<form
					onSubmit={handleSubmit}
					className="relative flex flex-row gap-2"
				>
					{error !== "" && (
						<p className="absolute bottom-full left-0 text-red-500">
							{error}
						</p>
					)}
					<Input
						placeholder={"Add task"}
						defaultValue={""}
						key={"TodoInput"}
						name="to-do-input"
						title="Task input"
						onChange={() => setError("")}
					/>
					<Button type="submit" className="cursor-pointer">
						Add task
					</Button>
				</form>
				<div className="w-full">
					<Tabs className="w-100" value={filterOptions} onValueChange={handleFilterChange}>
						<TabsList>
                            {
                                filters.map(filter => {
                                    return (
                                        <TabsTrigger className="p-3" value={filter} key={filter}>{filter}</TabsTrigger>
                                    )
                                })
                            }
						</TabsList>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
