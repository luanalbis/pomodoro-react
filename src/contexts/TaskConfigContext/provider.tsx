import { useEffect, useReducer } from "react";
import { taskConfigReducer } from "./reducer";
import type { TaskConfig } from "../../models/TaskConfig";
import { TaskConfigContext } from "./context";

export const initialTaskConfig: TaskConfig = {
	mode: "normal",
	totalCycles: 8,
	times: {
		workTime: 25,
		shortBreakTime: 10,
		longBreakTime: 25,
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
	}, []);

	useEffect(() => {
		if (taskConfig.mode === "teste") return;
		localStorage.setItem("taskConfig", JSON.stringify(taskConfig));
	}, [taskConfig]);

	return (
		<TaskConfigContext.Provider value={{ taskConfig, dispatchTaskConfig }}>
			{children}
		</TaskConfigContext.Provider>
	);
}
