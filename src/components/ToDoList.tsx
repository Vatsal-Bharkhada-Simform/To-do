import { useContext } from "react";
import { ToDoContext } from "../context/ToDoContext";
import type { ToDo } from "../types/to_do_type";
import ToDoItem from "./ToDoItem";

export default function ToDoList() {
	const { toDo, dispatch } = useContext(ToDoContext);

	function toggleStatus({ index, toDo }: { index: number; toDo: ToDo }) {
		dispatch({
			type: "UPDATE",
			payload: {
				...toDo,
				status: toDo.status === "COMPLETED" ? "PENDING" : "COMPLETED",
			},
			index: index,
		});
	}

	function handleDelete({ index, toDo }: { index: number; toDo: ToDo }) {
		dispatch({
			type: "DELETE",
			payload: toDo,
			index: index,
		});
	}

	function handleUpdate({
		index,
		toDo,
		newText,
	}: {
		index: number;
		toDo: ToDo;
		newText: string;
	}) {
		if (newText.trim() === toDo.title) return;
		else {
			dispatch({
				type: "UPDATE",
				payload: {
					...toDo,
					title: newText,
				},
				index: index,
			});
		}
	}

	return (
		<ul className="w-150 max-w-full flex flex-col gap-2 list-none pb-24">
			{toDo.map((item, index) => {
				return (
					<ToDoItem
						toDo={item}
						key={item.id}
						toggleStatus={({ toDo }: { toDo: ToDo }) =>
							toggleStatus({ index, toDo })
						}
						handleDelete={({ toDo }: { toDo: ToDo }) =>
							handleDelete({ index, toDo })
						}
						handleUpdate={({
							toDo,
							newText,
						}: {
							toDo: ToDo;
							newText: string;
						}) => handleUpdate({ index, toDo, newText })}
					/>
				);
			})}
		</ul>
	);
}
