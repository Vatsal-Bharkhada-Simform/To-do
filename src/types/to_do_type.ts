import type { Dispatch, SetStateAction } from "react";

type ToDo = {
	title: string;
	id: number;
	status: "PENDING" | "COMPLETED";
	createdAt: Date;
};

type FilterOptions = "All" | "Completed" | "Incomplete";

type ToDoContextType = {
	toDo: ToDo[];
	filterOptions: string;
	setFilterOptions: Dispatch<SetStateAction<string>>;
	dispatch: React.ActionDispatch<[action: ReducerAction]>;
};

type ReducerAction = {
	type: "ADD" | "UPDATE" | "DELETE";
	payload: ToDo;
	index?: number;
};

export type { ToDo, ToDoContextType, ReducerAction, FilterOptions };
