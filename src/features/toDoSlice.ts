import type { FilterOptions, ToDo } from "@/types/to_do_type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
    toDoItems: Array<ToDo>,
    filterOptions: FilterOptions;
}

export const TODO_LOCAL_STORE = "TODO_LOCAL_STORE"; // LocalStorage store name

function loadInitialState(): InitialStateType{
    try {
        const state = localStorage.getItem(TODO_LOCAL_STORE);
        if(state === null){
            return {
                toDoItems: [],
                filterOptions: "All"
            }
        }
        const parsedData = JSON.parse(state) as InitialStateType;

        const todayDate = new Date().toISOString().split("T")[0];
        parsedData.toDoItems = parsedData.toDoItems.filter(item => item.createdAt === todayDate);

        return parsedData;
    } catch(err){
        console.error("Error while fetching to-do data from localStorage");
        console.error(err);
        return {
			toDoItems: [],
			filterOptions: "All",
		};
    }
}

const initialState : InitialStateType = loadInitialState();

export const toDoSlice = createSlice({
	name: "toDo",
	initialState,
	reducers: {
		addToDo: (state, action: PayloadAction<ToDo>) => {
			state.toDoItems.push(action.payload);
		},

		editTodo: (state, action: PayloadAction<ToDo>) => {
			const index = state.toDoItems.findIndex(item => item.id === action.payload.id);
            if(index !== -1){
                state.toDoItems[index] = action.payload;
            }
		},

		deleteToDo: (state, action: PayloadAction<ToDo>) => {
			state.toDoItems = state.toDoItems.filter((item) => item.id !== action.payload.id);
		},

        changeFilter: (state, action: PayloadAction<FilterOptions>) => {
            state.filterOptions = action.payload;
            console.log(state.filterOptions);
        }
	},
});

export const {addToDo, editTodo, deleteToDo, changeFilter} = toDoSlice.actions;
export default toDoSlice.reducer;
