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

export default function ToDoItem({
	toDo,
	toggleStatus,
	handleDelete,
	handleUpdate,
}: ToDoItemProps) {
	const [inputText, setInputText] = useState(toDo.title);

	return (
		<li className="px-4 py-2 rounded-2xl flex justify-between items-center hover:bg-gray-50 cursor-pointer">
			<div className="flex items-center gap-2">
				<Input
					type="checkbox"
					className={"accent-blue-500"}
					onChange={() => toggleStatus(toDo)}
					checked={toDo.status === "COMPLETED"}
				/>
				{toDo.status === "COMPLETED" ? (
					<div className="line-through text-sm px-2">
						{toDo.title}
					</div>
				) : (
					<Input
						value={inputText}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setInputText(e.target.value)
						}
						onBlur={() => handleUpdate(toDo, inputText)}
						className="max-w-full min-w-0"
					/>
				)}
			</div>
			<div>
				<Button variant="DANGER" onClick={() => handleDelete(toDo)}>
					<Icon id="trashBin" />
				</Button>
			</div>
		</li>
	);
}
