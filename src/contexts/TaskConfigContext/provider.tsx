import { useEffect, useReducer } from "react";
import { taskConfigReducer } from "./reducer";
import type { TaskConfig } from "../../models/TaskConfig";
import { TaskConfigContext } from "./context";

export const initialTaskConfig: TaskConfig = {
	totalCycles: 3,
	times: {
		workTime: 1,
		shortBreakTime: 1,
		longBreakTime: 1,
	},
};

type TaskConfigContextProviderProps = { children: React.ReactNode };

export function TaskConfigContextProvider({ children }: TaskConfigContextProviderProps) {
	const [taskConfig, dispatchTaskConfig] = useReducer(taskConfigReducer, initialTaskConfig, () => {
		const storageApp = localStorage.getItem("taskConfig");
		if (!storageApp) return initialTaskConfig;

		const parsedApp = JSON.parse(storageApp) as TaskConfig;

		return { ...parsedApp };
	});

	useEffect(() => {
		localStorage.setItem("taskConfig", JSON.stringify(taskConfig));
	}, [taskConfig]);

	return (
		<TaskConfigContext.Provider value={{ taskConfig, dispatchTaskConfig }}>
			{children}
		</TaskConfigContext.Provider>
	);
}
