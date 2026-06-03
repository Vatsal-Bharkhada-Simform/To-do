import type { ReducerAction, ToDo } from "../types/to_do_type";

export function todoReducer(prevState: Array<ToDo>, action: ReducerAction): Array<ToDo> {
	if (expired()) return [];
	switch (action.type) {
		case "ADD":
			return [
				...prevState,
				{
					...action.payload,
					id: (prevState.at(-1)?.id ?? 0) + 1,
				},
			];

		case "UPDATE":
			if (action.index === undefined)
				throw new Error("Invalid reducer update call");
			return [
				...prevState.slice(0, action.index),
				action.payload,
				...prevState.slice(action.index + 1),
			];

		case "DELETE":
			return prevState.filter(
				(item, index) =>
					item.id !== action.payload.id && index !== action.index
			);

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
