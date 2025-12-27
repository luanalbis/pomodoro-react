import { createContext, useContext } from "react";
import type { TaskConfigAction } from "./actions";
import type { TaskConfig } from "../../models/TaskConfig";

export type TaskConfigContextProps = {
	taskConfig: TaskConfig;
	dispatchTaskConfig: React.Dispatch<TaskConfigAction>;
};

export const TaskConfigContext = createContext<TaskConfigContextProps | null>(null);

export function useTaskConfigContext() {
	const context = useContext(TaskConfigContext);

	if (!context)
		throw new Error("useTaskConfigContext deve ser usado dentro de TaskConfigContextProvider");

	return context;
}
