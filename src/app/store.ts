import { configureStore } from "@reduxjs/toolkit";
import toDoReducer, { TODO_LOCAL_STORE } from "../features/toDoSlice";

export const toDoStore = configureStore({
	reducer: {
		toDo: toDoReducer,
	},
});

toDoStore.subscribe(() => {
	try {
		const serializedData = JSON.stringify(toDoStore.getState().toDo);
		localStorage.setItem(TODO_LOCAL_STORE, serializedData);
	} catch (err) {
		console.error("Error while storing data to localStorage");
		console.error(err);
	}
});

export type RootState = ReturnType<typeof toDoStore.getState>;
export type toDoDispatch = typeof toDoStore.dispatch;

export default toDoStore;
