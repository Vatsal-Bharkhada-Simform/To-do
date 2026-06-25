import { useDispatch, useSelector } from "react-redux";
import type { RootState, ToDoDispatch } from "./store";

export const useToDoDispatch = useDispatch.withTypes<ToDoDispatch>();
export const useToDoSelector = useSelector.withTypes<RootState>();
