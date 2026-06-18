import type { ThemeContextType, ThemeType } from "@/types/to_do_type";
import { useEffect, useState, type ReactElement } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeContextProvider({ children }: { children: ReactElement }) {
	const [theme, setTheme] = useState<ThemeType>("LIGHT");

    useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "DARK");
	}, [theme]);
    
	function toggleTheme() {
        console.log("HII");
		setTheme((prev) => (prev === "LIGHT" ? "DARK" : "LIGHT"));
	}

	const ctxValue: ThemeContextType = { theme, toggleTheme };

	return (
		<ThemeContext.Provider value={ctxValue}>
			{children}
		</ThemeContext.Provider>
	);
}
