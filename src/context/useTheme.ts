import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		throw new Error("Theme context cannot be invoked for this component");
	}

	return themeContext;
}
