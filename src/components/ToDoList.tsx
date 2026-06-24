import type { ToDo } from "../types/to_do_type";
import ToDoItem from "./ToDoItem";
import { useTheme } from "@/context/useTheme";
import { useToDoDispatch, useToDoSelector } from "@/app/hooks";
import { deleteToDo, editTodo } from "@/features/toDoSlice";

export default function ToDoList() {
	const toDo = useToDoSelector((state) => state.toDo.toDoItems);
	const filterOption = useToDoSelector((state) => state.toDo.filterOptions);
	const dispatch = useToDoDispatch();

	const { theme } = useTheme();

    let toDoToDisplay: Array<ToDo> = [];
    if(filterOption === "All"){
        toDoToDisplay = toDo;
    } else {
        toDoToDisplay = toDo.filter((item) => item.status === (filterOption === "Completed" ? "COMPLETED" : "PENDING"));
    }
    
	function toggleStatus(toDo: ToDo) {
		dispatch(
			editTodo({
				...toDo,
				status: toDo.status === "COMPLETED" ? "PENDING" : "COMPLETED",
			})
		);
	}

	function handleDelete(toDo: ToDo) {
		dispatch(deleteToDo(toDo));
	}

	function handleUpdate(toDo: ToDo) {
		dispatch(editTodo(toDo));
	}

	function populateToDoItems() {
		if (toDoToDisplay.length === 0) {
			return (
				<div
					className={`w-full p-8 text-center rounded-2xl font-semibold ${theme === "LIGHT" ? "text-gray-500 bg-gray-100" : "text-neutral-400 bg-neutral-800"}`}
				>
					Nothing to show
				</div>
			);
		}

		return toDoToDisplay.map((item) => {
			return (
				<ToDoItem
					toDo={item}
					key={item.id}
					handleDelete={handleDelete}
					handleUpdate={handleUpdate}
					toggleStatus={toggleStatus}
				/>
			);
		});
	}

	return (
		<ul className="w-150 max-w-full flex flex-col gap-2 list-none pb-24">
			{populateToDoItems()}
		</ul>
	);
}
