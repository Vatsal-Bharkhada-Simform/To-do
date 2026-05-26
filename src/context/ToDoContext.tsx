import { createContext } from "react";
import type { ToDoContextType } from "../types/to_do_type";

export const ToDoContext = createContext<ToDoContextType>({
	toDo: [],
	dispatch: () => {},
});
