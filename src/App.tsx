import { ThemeContextProvider } from "./context/ThemeContextProvider";
import ToDoContextProvider from "./context/ToDoContextProvider";
import Content from "./layout/Content";

function App() {
	return (
		<ThemeContextProvider>
			<ToDoContextProvider>
				<Content />
			</ToDoContextProvider>
		</ThemeContextProvider>
	);
}

export default App;
