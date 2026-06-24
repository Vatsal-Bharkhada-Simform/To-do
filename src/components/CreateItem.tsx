import { useState } from "react";
import { useTheme } from "@/context/useTheme";
import { useToDoDispatch, useToDoSelector } from "@/app/hooks";
import { addToDo, changeFilter } from "@/features/toDoSlice";
import type { FilterOptions } from "../types/to_do_type";
import isValidToDo from "../utils/validateInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const filters: Array<FilterOptions> = ["All", "Completed", "Incomplete"];

export default function CreateItem() {
	const [error, setError] = useState("");

	const filterOptions = useToDoSelector((state) => state.toDo.filterOptions);
	const dispatch = useToDoDispatch();

	const { theme, toggleTheme } = useTheme();

	function handleFilterChange(newValue: string) {
		dispatch(changeFilter(newValue as FilterOptions));
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

		dispatch(
			addToDo({
				id: crypto.randomUUID(),
				createdAt: new Date().toISOString().split("T")[0],
				status: "PENDING",
				title: task.trim(),
			})
		);

		e.currentTarget.reset();
	}

	return (
		<div
			className={`w-screen flex justify-center sticky top-0 z-20 pt-20 pb-6 ${theme === "LIGHT" ? "bg-white" : "bg-neutral-900"}`}
		>
			<div className="w-150 flex flex-col gap-4">
				<header className="flex gap-2 mb-3">
					<div className="flex-1">
						<h1 className="text-4xl font-extrabold">Your Todo</h1>
					</div>
					<div className="flex items-center space-x-2">
						<Switch
							id="theme-toggle"
							checked={theme === "DARK"}
							onCheckedChange={toggleTheme}
						/>
						<Label htmlFor="theme-toggle">Toggle theme</Label>
					</div>
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
							maxLength={40}
						/>
						<Button type="submit" className="cursor-pointer">
							Add task
						</Button>
					</form>
					<div className="w-full">
						<Tabs
							className="w-100"
							value={filterOptions}
							onValueChange={handleFilterChange}
						>
							<TabsList>
								{filters.map((filter) => {
									return (
										<TabsTrigger
											className="p-3"
											value={filter}
											key={filter}
										>
											{filter}
										</TabsTrigger>
									);
								})}
							</TabsList>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}
