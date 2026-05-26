import { useEffect, useReducer } from "react";
import { ToDoContext } from "./ToDoContext";
import { todoReducer } from "../utils/todoReducer";
import { fetchToDO } from "../utils/fetchToDo";

export default function ToDoContextProvider({ children }) {
	const [toDo, dispatch] = useReducer(todoReducer, fetchToDO());

	useEffect(() => {
		localStorage.setItem("TO_DO_ITEMS", JSON.stringify(toDo));
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
