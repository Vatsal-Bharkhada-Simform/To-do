type ToDo = {
	title: string;
	id: number;
	status: "PENDING" | "COMPLETED";
	createdAt: Date;
};

type ToDoContextType = {
	toDo: ToDo[];
	dispatch: React.ActionDispatch<[action: ReducerAction]>;
};

type ReducerAction = {
	type: "ADD" | "UPDATE" | "DELETE";
	payload: ToDo;
	index?: number;
};

export type { ToDo, ToDoContextType, ReducerAction };
