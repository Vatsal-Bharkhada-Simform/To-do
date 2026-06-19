import { useTheme } from "@/context/useTheme";
import CreateItem from "../components/CreateItem";
import ToDoList from "../components/ToDoList";

export default function Content() {
    const {theme} = useTheme();
    console.log(theme);
    
	return (
		<main className={`max-w-screen h-screen flex justify-center overflow-x-hidden ${theme === "LIGHT" ? "bg-white text-neutral-800" : "bg-neutral-900 text-neutral-50 scheme-only-dark"}`}>
			<div className="px-4 flex flex-col items-center gap-4">
				<CreateItem />
				<ToDoList />
			</div>
		</main>
	);
}
