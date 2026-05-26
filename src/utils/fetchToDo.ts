import type { ToDo } from "../types/to_do_type";

export function fetchToDO(): ToDo[] {
	try {
		const toDoData = localStorage.getItem("TO_DO_ITEMS");

		if (!toDoData) return [];

		const parsedData = JSON.parse(toDoData);
		console.log("Fetched to-do: ", parsedData);

		if (!parsedData.date || !parsedData.toDo || !Array.isArray(parsedData.toDo)) {
			return [];
		}

		if (parsedData.date !== new Date().toISOString().split("T")[0]){
			return [];
		}
		
		return parsedData.toDo.filter(
			(task) => task?.title && task?.id && task?.status && task?.createdAt
		);
	} catch {
		return [];
	}
}
