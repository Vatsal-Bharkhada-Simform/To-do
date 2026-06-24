import { Provider } from "react-redux";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import Content from "./layout/Content";
import toDoStore from "./app/store";

function App() {
	return (
		<Provider store={toDoStore}>
			<ThemeContextProvider>
				<Content />
			</ThemeContextProvider>
		</Provider>
	);
}

export default App;
