import { memo, useEffect, useRef, useState } from "react";
import type { ToDo } from "../types/to_do_type";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";
import getFormattedDate from "../utils/formatDate";

type ToDoItemProps = {
	toDo: ToDo;
	toggleStatus: ({ toDo }: { toDo: ToDo }) => void;
	handleDelete: ({ toDo }: { toDo: ToDo }) => void;
	handleUpdate: ({ toDo, newText }: { toDo: ToDo; newText: string }) => void;
};
type EditFlags = "EDIT_ON" | "EDITED" | "EDIT_OFF";

const ToDoItem = memo(function ({
	toDo,
	toggleStatus,
	handleDelete,
	handleUpdate,
}: ToDoItemProps) {
	const [editMode, setEditMode] = useState<EditFlags>("EDIT_OFF");
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleOnBlur(toDo: ToDo) {
		if (inputRef.current) {
			handleUpdate({ toDo: toDo, newText: inputRef.current.value });
			setEditMode("EDITED");
		}
	}

	function handleToggleEdit() {
		if (editMode === "EDIT_OFF") {
			setEditMode("EDIT_ON");
		} else {
			setEditMode("EDIT_OFF");
		}
	}

	useEffect(() => {
		if (inputRef.current && editMode === "EDIT_ON") {
			inputRef.current.focus();
		}
	}, [editMode]);

	return (
		<li className="relative px-4 py-2 rounded-2xl flex justify-between items-center hover:bg-gray-50 cursor-pointer overflow-visible group">
			<span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 z-20 whitespace-nowrap text-gray-400 opacity-0 group-hover:opacity-100 transition-all">
				{getFormattedDate(toDo.createdAt)}
			</span>
			<div className="flex flex-1 items-center gap-2 overflow-x-hidden">
				<Input
					type="checkbox"
					className={"accent-blue-500"}
					onChange={() => toggleStatus({ toDo })}
					value={toDo.status}
					title="Mark as complete"
					checked={toDo.status === "COMPLETED"}
				/>
				{editMode === "EDIT_ON" ? (
					<Input
						id={toDo.title + toDo.id}
						ref={inputRef}
						defaultValue={toDo.title}
						onBlur={() => handleOnBlur(toDo)}
						title="Edit task content"
						className="w-full max-w-full min-w-0 wrap-break-word"
					/>
				) : (
					<div
						className={`${toDo.status === "COMPLETED" && "line-through text-gray-500"} text-base px-2 wrap-break-word max-w-full`}
					>
						{toDo.title}
					</div>
				)}
			</div>
			<div>
				{toDo.status !== "COMPLETED" && (
					<Button
						variant="SECONDARY"
						onClick={handleToggleEdit}
						title="Edit task"
						className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
					>
						<Icon id="edit" />
					</Button>
				)}
				<Button
					variant="DANGER"
					onClick={() => handleDelete({ toDo })}
					title="Delete task"
					className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
				>
					<Icon id="trashBin" />
				</Button>
			</div>
		</li>
	);
});

export default ToDoItem;
