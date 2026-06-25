import { filters, type FilterOptions, type ToDo } from "@/types/to_do_type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
	toDoItems: Array<ToDo>;
	filterOptions: FilterOptions;
};

export const TODO_LOCAL_STORE = "TODO_LOCAL_STORE"; // LocalStorage store name

function loadInitialState(): InitialStateType {
	try {
		const state = localStorage.getItem(TODO_LOCAL_STORE);
		if (state === null) {
			return {
				toDoItems: [],
				filterOptions: "All",
			};
		}
		const parsedData = JSON.parse(state) as InitialStateType;
		if (
			typeof parsedData !== "object" ||
			!parsedData.toDoItems ||
			!Array.isArray(parsedData.toDoItems) ||
			!parsedData.filterOptions ||
			!filters.includes(parsedData.filterOptions)
		) {
			throw new Error("Defective toDo data. Data will be reset.");
		}

		return parsedData;
	} catch (err) {
		console.error("Error while fetching to-do data from localStorage");
		console.error(err);
		return {
			toDoItems: [],
			filterOptions: "All",
		};
	}
}

function clearExpiredToDos(initialState: InitialStateType){
    const currentDate = new Date().toISOString().split("T")[0];
	initialState.toDoItems = initialState.toDoItems.filter(
		(item) => item.createdAt === currentDate
	);
    return initialState;
}

const initialState: InitialStateType = clearExpiredToDos(loadInitialState());

export const toDoSlice = createSlice({
	name: "toDo",
	initialState,
	reducers: {
		addToDo: (state, action: PayloadAction<ToDo>) => {
			state.toDoItems.push(action.payload);
		},

		editToDo: (state, action: PayloadAction<ToDo>) => {
			const index = state.toDoItems.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.toDoItems[index] = action.payload;
			}
		},

		deleteToDo: (state, action: PayloadAction<ToDo>) => {
			state.toDoItems = state.toDoItems.filter(
				(item) => item.id !== action.payload.id
			);
		},

		changeFilter: (state, action: PayloadAction<FilterOptions>) => {
			state.filterOptions = action.payload;
		},
	},
});

export const { addToDo, editToDo, deleteToDo, changeFilter } =
	toDoSlice.actions;
export default toDoSlice.reducer;
