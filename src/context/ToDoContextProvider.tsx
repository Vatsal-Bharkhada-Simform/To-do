import { useEffect, useReducer, type ReactElement } from "react";
import { ToDoContext } from "./ToDoContext";
import { todoReducer } from "../utils/todoReducer";
import { fetchToDO } from "../utils/fetchToDo";

export default function ToDoContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [toDo, dispatch] = useReducer(todoReducer, fetchToDO());

	useEffect(() => {
		const prevItems = JSON.parse(localStorage.getItem("TO_DO_ITEMS"));
		if (
			prevItems &&
			prevItems.date !== new Date().toISOString().split("T")[0]
		) {
			localStorage.removeItem("TO_DO_ITEMS");
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

	const ctxValue = {
		toDo: toDo,
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
