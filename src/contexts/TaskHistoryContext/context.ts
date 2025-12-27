import { createContext, useContext } from "react";
import type { TaskHistoryAction } from "./actions";
import type { TaskModel } from "../../models/TaskModel";

export type taskHistoryContextProps = {
	history: TaskModel[];
	dispatchHistory: React.Dispatch<TaskHistoryAction>;
};

export const TaskHistoryContext = createContext<taskHistoryContextProps | null>(null);

export function useTaskHistoryContext() {
	const context = useContext(TaskHistoryContext);

	if (!context) throw new Error("useTaskContext deve ser usado dentro de TaskContextProvider");

	return context;
}
