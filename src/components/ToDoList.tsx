import { useContext } from "react";
import { ToDoContext } from "../context/ToDoContext";
import type { ToDo } from "../types/to_do_type";
import ToDoItem from "./ToDoItem";

export default function ToDoList() {
	const { toDo, dispatch } = useContext(ToDoContext);

	function toggleStatus(toDo: ToDo) {
		dispatch({
			type: "UPDATE",
			payload: {
				...toDo,
				status: toDo.status === "COMPLETED" ? "PENDING" : "COMPLETED",
			},
		});
	}

	function handleDelete(toDo: ToDo) {
		dispatch({
			type: "DELETE",
			payload: toDo,
		});
	}

	function handleUpdate(toDo: ToDo) {
		dispatch({
			type: "UPDATE",
			payload: toDo,
		});
	}

	function populateToDoItems() {
		if (toDo.length === 0) {
			return (
				<div className="w-full p-8 text-center text-gray-500 bg-gray-100 rounded-2xl font-semibold">
					Nothing to show
				</div>
			);
		}

		return toDo.map((item) => {
			return (
				<ToDoItem
					toDo={item}
					key={item.id}
					handleDelete={handleDelete}
					handleUpdate={handleUpdate}
					toggleStatus={toggleStatus}
				/>
			);
		});
	}

	return (
		<ul className="w-150 max-w-full flex flex-col gap-2 list-none pb-24">
			{populateToDoItems()}
		</ul>
	);
}
