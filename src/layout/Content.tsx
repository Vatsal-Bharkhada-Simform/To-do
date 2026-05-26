import CreateItem from "../components/CreateItem";
import ToDoList from "../components/ToDoList";

export default function Content() {
	return (
		<main className="w-screen h-screen overflow-hidden flex justify-center py-12">
			<div className="w-150 max-w-full p-4 flex flex-col gap-4">
				<CreateItem />
				<ToDoList />
			</div>
		</main>
	);
}
