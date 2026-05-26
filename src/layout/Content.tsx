import CreateItem from "../components/CreateItem";
import ListItems from "../components/ListItems";

export default function Content() {
	return (
		<main className="w-screen h-screen overflow-hidden flex justify-center py-12">
			<div className="w-120 max-w-full p-4 flex flex-col gap-4">
				<CreateItem />
				<ListItems />
			</div>
		</main>
	);
}
