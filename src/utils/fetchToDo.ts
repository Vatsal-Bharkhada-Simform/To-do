import type { ToDo } from "../types/to_do_type";

export function fetchToDO(): ToDo[] {
	try {
		const toDoData = localStorage.getItem("TO_DO_ITEMS");

		if (!toDoData) return [];

		const parsedData = JSON.parse(toDoData);

		if (!Array.isArray(parsedData)) {
			return [];
		}

		console.log("Fetched to-do: ", parsedData);

		return parsedData.filter(
			(task) => task?.title && task?.id && task?.status && task?.createdAt
		);
	} catch {
		return [];
	}
}
