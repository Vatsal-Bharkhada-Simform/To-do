import { useDispatch, useSelector } from "react-redux";
import type { RootState, toDoDispatch } from "./store";

export const useToDoDispatch = useDispatch.withTypes<toDoDispatch>();
export const useToDoSelector = useSelector.withTypes<RootState>();
