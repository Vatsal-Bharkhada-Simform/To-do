import type { ReducerAction, ToDo } from "../types/to_do_type";

export function todoReducer(
	prevState: Array<ToDo>,
	action: ReducerAction
): Array<ToDo> {
	if (expired()) return [];
	switch (action.type) {
		case "ADD":
			return [
				...prevState,
				{
					...action.payload,
					id: crypto.randomUUID(),
				},
			];

		case "UPDATE":
			return prevState.map((todo) => {
				if (todo.id === action.payload.id) {
					return action.payload;
				}
				return todo;
			});

		case "DELETE":
			return prevState.filter((item) => item.id !== action.payload.id);

		default:
			throw new Error("Invalid reducer action passed");
	}
}

function expired() {
	return (
		JSON.parse(localStorage.getItem("TO_DO_ITEMS") ?? "")?.date !==
		new Date().toISOString().split("T")[0]
	);
}
