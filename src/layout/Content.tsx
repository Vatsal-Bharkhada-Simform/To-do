import CreateItem from "../components/CreateItem";
import ToDoList from "../components/ToDoList";

export default function Content() {
	return (
		<main className="max-w-screen h-screen flex justify-center overflow-x-hidden">
			<div className="px-4 flex flex-col gap-4">
				<CreateItem />
				<ToDoList />
			</div>
		</main>
	);
}
