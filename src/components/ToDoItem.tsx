import { useState } from "react";
import type { ToDo } from "../types/to_do_type";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";

type ToDoItemProps = {
	toDo: ToDo;
	toggleStatus: (toDo: ToDo) => void;
	handleDelete: (toDo: ToDo) => void;
	handleUpdate: (toDo: ToDo, newText: string) => void;
};

function getFormattedDate(date: string | Date) {
	return (
		new Date(date).toDateString().split(" ").slice(1, -1).join(" ") +
		", " +
		new Date(date).toLocaleTimeString("UTC", {
			hour: "numeric",
			minute: "2-digit",
		})
	);
}

export default function ToDoItem({
	toDo,
	toggleStatus,
	handleDelete,
	handleUpdate,
}: ToDoItemProps) {
	const [inputText, setInputText] = useState(toDo.title);

	return (
		<li className="relative px-4 py-2 rounded-2xl flex justify-between items-center hover:bg-gray-50 cursor-pointer overflow-visible group">
			<span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 z-20 whitespace-nowrap text-gray-400 opacity-0 group-hover:opacity-100 transition-all">
				{getFormattedDate(toDo.createdAt)}
			</span>
			<div className="flex flex-1 items-center gap-2 overflow-x-hidden">
				<Input
					type="checkbox"
					className={"accent-blue-500"}
					onChange={() => toggleStatus(toDo)}
					checked={toDo.status === "COMPLETED"}
				/>
				{toDo.status === "COMPLETED" ? (
					<div className="line-through text-gray-400 text-base px-2 wrap-break-word max-w-full">
						{toDo.title}
					</div>
				) : (
					<Input
						value={inputText}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setInputText(e.target.value)
						}
						onBlur={() => handleUpdate(toDo, inputText)}
						className="w-full max-w-full min-w-0 wrap-break-word"
					/>
				)}
			</div>
			<div>
				<Button variant="DANGER" onClick={() => handleDelete(toDo)} className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
					<Icon id="trashBin" />
				</Button>
			</div>
		</li>
	);
}
