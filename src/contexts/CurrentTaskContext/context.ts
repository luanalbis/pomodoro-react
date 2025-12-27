import { createContext, useContext } from "react";
import type { CurrentTaskAction } from "./actions";
import type { TaskModel } from "../../models/TaskModel";

export type TaskContextProps = {
	currentTask: TaskModel | null;
	dispatchCurrentTask: React.Dispatch<CurrentTaskAction>;
};

export const CurrentTaskContext = createContext<TaskContextProps | null>(null);

export function useCurrentTaskContext() {
	const context = useContext(CurrentTaskContext);

	if (!context) throw new Error("useTaskContext deve ser usado dentro de TaskContextProvider");

	return context;
}
