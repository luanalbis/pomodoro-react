import { useEffect, useReducer } from "react";
import type { CycleModel } from "../../models/CycleModel";
import { TaskHistoryContext } from "./context";
import { historyReducer } from "./reducer";
import { useCurrentTaskContext } from "../CurrentTaskContext/context";
import type { TaskModel } from "../../models/TaskModel";

export const taskTypeLabels: Record<CycleModel["type"], string> = {
	workTime: "Foco",
	shortBreakTime: "Descanso rápido",
	longBreakTime: "Descanso longo",
};

type TaskHistoryContextProps = { children: React.ReactNode };

export function TaskHistoryContextProvider({ children }: TaskHistoryContextProps) {
	const [history, dispatchHistory] = useReducer(historyReducer, [], () => {
		const stored = localStorage.getItem("taskHistory");
		if (!stored) return [];

		const parsed: TaskModel[] = JSON.parse(stored);

		return parsed.map((task) => {
			if (!task.finishedAt) {
				return { ...task, status: "Abandonada" };
			}
			return task;
		});
	});
	const { currentTask } = useCurrentTaskContext();

	useEffect(() => {
		if (!currentTask) return;

		dispatchHistory({
			type: "UPDATE_TASK_IN_HISTORY",
			payload: { task: currentTask },
		});
	}, [currentTask?.status, dispatchHistory]);

	useEffect(() => {
		localStorage.setItem("taskHistory", JSON.stringify(history));
	}, [history]);

	return (
		<TaskHistoryContext.Provider value={{ history, dispatchHistory }}>
			{children}
		</TaskHistoryContext.Provider>
	);
}
