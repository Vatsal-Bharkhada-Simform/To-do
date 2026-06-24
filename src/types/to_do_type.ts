import type { Dispatch, SetStateAction } from "react";

type ToDo = {
	title: string;
	id: string;
	status: "PENDING" | "COMPLETED";
	createdAt: string;
};

type FilterOptions = "All" | "Completed" | "Incomplete";

type ToDoContextType = {
	toDo: Array<ToDo>;
	filterOptions: FilterOptions;
	setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
	dispatch: React.ActionDispatch<[action: ReducerAction]>;
};

type ReducerAction = {
	type: "ADD" | "UPDATE" | "DELETE" | "CLEAR";
	payload: ToDo;
};

type ThemeType = "LIGHT" | "DARK";

type ThemeContextType = {
    theme: ThemeType,
    toggleTheme: () => void
}

export type { ToDo, ToDoContextType, ReducerAction, FilterOptions, ThemeType, ThemeContextType };
