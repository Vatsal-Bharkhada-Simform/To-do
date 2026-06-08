import type { ReducerAction, ToDo } from "../types/to_do_type";

export function todoReducer(
	prevState: Array<ToDo>,
	action: ReducerAction
): Array<ToDo> {
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

		case "CLEAR":
			return [];

		default:
			throw new Error("Invalid reducer action passed");
	}
}
