import {
	useEffect,
	useMemo,
	useReducer,
	useState,
	type ReactElement,
} from "react";
import { todoReducer } from "../utils/todoReducer";
import { fetchToDO } from "../utils/fetchToDo";
import type { FilterOptions, ToDo } from "../types/to_do_type";
import { ToDoContext } from "./ToDoContext";

export default function ToDoContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [toDo, dispatch] = useReducer(todoReducer, undefined, fetchToDO);
	const [filterOptions, setFilterOptions] = useState<FilterOptions>("All");

	useEffect(() => {
		if (toDo.length === 0) return;
		if (expired()) {
			dispatch({
				payload: toDo[0],
				type: "CLEAR",
			});
			localStorage.setItem(
				"TO_DO_ITEMS",
				JSON.stringify({
					date: new Date().toISOString().split("T")[0],
					toDo: [],
				})
			);
			return;
		}
		localStorage.setItem(
			"TO_DO_ITEMS",
			JSON.stringify({
				date: new Date().toISOString().split("T")[0],
				toDo: toDo,
			})
		);
	}, [toDo]);

	let toDos: Array<ToDo>;
	if (filterOptions === "Incomplete") {
		toDos = toDo.filter((item) => item.status === "PENDING");
	} else if (filterOptions === "Completed") {
		toDos = toDo.filter((item) => item.status === "COMPLETED");
	} else {
		toDos = toDo;
	}

	const ctxValue = useMemo(() => {
		return {
			toDo: toDos,
			filterOptions: filterOptions,
			setFilterOptions: setFilterOptions,
			dispatch: dispatch,
		};
	}, [toDos, filterOptions]);

	return (
		<>
			<ToDoContext.Provider value={ctxValue}>
				{children}
			</ToDoContext.Provider>
		</>
	);
}

function expired() {
	const date = JSON.parse(localStorage.getItem("TO_DO_ITEMS"))?.date;
	if (!date) return false;
	return date !== new Date().toISOString().split("T")[0];
}
