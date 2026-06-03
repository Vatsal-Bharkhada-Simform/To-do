import { useEffect, useReducer, useState, type ReactElement } from "react";
import { todoReducer } from "../utils/todoReducer";
import { fetchToDO } from "../utils/fetchToDo";
import type { ToDo } from "../types/to_do_type";
import { ToDoContext } from "./ToDoContext";

export default function ToDoContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [toDo, dispatch] = useReducer(todoReducer, undefined, fetchToDO);
	const [filterOptions, setFilterOptions] = useState("All");

	useEffect(() => {
		localStorage.setItem(
			"TO_DO_ITEMS",
			JSON.stringify({
				date: new Date().toISOString().split("T")[0],
				toDo: toDo,
			})
		);
	}, [toDo]);

	let toDos: ToDo[];
	if (filterOptions === "Incomplete") {
		toDos = toDo.filter((item) => item.status === "PENDING");
	} else if (filterOptions === "Completed") {
		toDos = toDo.filter((item) => item.status === "COMPLETED");
	} else {
		toDos = toDo;
	}

	const ctxValue = {
		toDo: toDos,
		filterOptions: filterOptions,
		setFilterOptions: setFilterOptions,
		dispatch: dispatch,
	};

	return (
		<>
			<ToDoContext.Provider value={ctxValue}>
				{children}
			</ToDoContext.Provider>
		</>
	);
}
