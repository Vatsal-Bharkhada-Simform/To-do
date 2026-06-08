import type { Dispatch, SetStateAction } from "react";

type ToDo = {
	title: string;
	id: string;
	status: "PENDING" | "COMPLETED";
	createdAt: Date;
};

type FilterOptions = "All" | "Completed" | "Incomplete";

type ToDoContextType = {
	toDo: Array<ToDo>;
	filterOptions: FilterOptions;
	setFilterOptions: Dispatch<SetStateAction<string>>;
	dispatch: React.ActionDispatch<[action: ReducerAction]>;
};

type ReducerAction = {
	type: "ADD" | "UPDATE" | "DELETE" | "CLEAR";
	payload: ToDo;
};

export type { ToDo, ToDoContextType, ReducerAction, FilterOptions };
