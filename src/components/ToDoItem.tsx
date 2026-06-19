import { memo, useEffect, useRef, useState } from "react";
import type { ToDo } from "../types/to_do_type";
import getFormattedDate from "../utils/formatDate";
import { Button } from "./ui/button";
import Icon from "./Icon";
import { Input } from "./ui/input";
import isValidToDo from "../utils/validateInput";
import { Checkbox } from "./ui/checkbox";
import { useTheme } from "@/context/useTheme";

type ToDoItemProps = {
	toDo: ToDo;
	toggleStatus: (toDo: ToDo) => void;
	handleDelete: (toDo: ToDo) => void;
	handleUpdate: (toDo: ToDo) => void;
};

const ToDoItem = memo(function ({
	toDo,
	handleDelete,
	handleUpdate,
	toggleStatus,
}: ToDoItemProps) {
	const [editMode, setEditMode] = useState(false);
    const {theme} = useTheme();
    
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleToggleEdit() {
		if (!editMode) {
			setEditMode(true);
		} else {
			if (!inputRef.current) return;
			const value = inputRef.current?.value.trim();
			if (!isValidToDo(value)) {
				alert("Please enter a valid input");
				return;
			}
			if (value && value !== toDo.title) {
				handleUpdate({
					...toDo,
					title: value,
				});
			}
			setEditMode(false);
		}
	}

	useEffect(() => {
		if (inputRef.current && editMode) {
			inputRef.current.focus();
		}
	}, [editMode]);

	return (
		<li
			className={`relative px-4 py-2 rounded-2xl flex justify-between items-center border  cursor-pointer overflow-visible group ${theme === "LIGHT" ? "bg-gray-100 border-gray-200" : "bg-neutral-800 border-neutral-600"}`}
		>
			<span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 z-10 whitespace-nowrap text-neutral-400 transition-all">
				{getFormattedDate(toDo.createdAt)}
			</span>
			<div className="flex flex-1 items-center gap-2 overflow-x-hidden p-2">
				<Checkbox
					checked={toDo.status === "COMPLETED"}
					onCheckedChange={() => toggleStatus(toDo)}
					value={toDo.status}
					title="Mark as complete"
					className="border-gray-400"
				/>
				{editMode ? (
					<Input
						id={toDo.title + toDo.id}
						ref={inputRef}
						defaultValue={toDo.title}
						title="Edit task content"
						className="bg-gray-100 text-base!"
					/>
				) : (
					<div
						className={`${toDo.status === "COMPLETED" && "line-through text-neutral-500"} text-base px-2 py-1 wrap-break-word max-w-full`}
					>
						{toDo.title}
					</div>
				)}
			</div>
			<div className="flex gap-1">
				{toDo.status !== "COMPLETED" && (
					<Button
						variant="outline"
						size="icon-lg"
						onClick={handleToggleEdit}
						title={editMode ? "Save task" : "Edit task"}
						className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto cursor-pointer"
					>
						{editMode ? <Icon id="tickMark" /> : <Icon id="edit" />}
					</Button>
				)}
				<Button
					variant="destructive"
					size="icon-lg"
					onClick={() => handleDelete(toDo)}
					title="Delete task"
					className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto cursor-pointer"
				>
					<Icon id="trashBin" />
				</Button>
			</div>
		</li>
	);
});

export default ToDoItem;
