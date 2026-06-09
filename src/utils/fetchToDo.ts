import type { ToDo } from "../types/to_do_type";

export function fetchToDO(): Array<ToDo> {
	try {
		const toDoData = localStorage.getItem("TO_DO_ITEMS");

		if (!toDoData) return [];

		const parsedData = JSON.parse(toDoData);

		if (
			!parsedData.date ||
			!parsedData.toDo ||
			!Array.isArray(parsedData.toDo)
		) {
			return [];
		}

		if (parsedData.date !== new Date().toISOString().split("T")[0]) {
			localStorage.removeItem("TO_DO_ITEMS");
			return [];
		}

		return parsedData.toDo.filter(
			(task: ToDo) =>
				task?.title && task?.id && task?.status && task?.createdAt
		);
	} catch {
		return [];
	}
}
