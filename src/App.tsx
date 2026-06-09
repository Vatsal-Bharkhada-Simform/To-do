import ToDoContextProvider from "./context/ToDoContextProvider";
import Content from "./layout/Content";

function App() {
	return (
		<ToDoContextProvider>
			<Content />
		</ToDoContextProvider>
	);
}

export default App;
