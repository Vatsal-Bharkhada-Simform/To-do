type ToDo = {
	title: string;
	id: string;
	status: "PENDING" | "COMPLETED";
	createdAt: string;
};

export const filters = ["All", "Completed", "Incomplete"] as const;

type FilterOptions = typeof filters[number];

type ThemeType = "LIGHT" | "DARK";

type ThemeContextType = {
	theme: ThemeType;
	toggleTheme: () => void;
};

export type {
	ToDo,
	FilterOptions,
	ThemeType,
	ThemeContextType,
};
