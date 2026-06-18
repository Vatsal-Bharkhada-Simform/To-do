import type { ThemeContextType } from "@/types/to_do_type";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextType>({
    theme: "LIGHT",
    toggleTheme: () => {}
});
