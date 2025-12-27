import { useEffect, useReducer } from "react";
import type { CycleModel } from "../../models/CycleModel";
import { CurrentTaskContext } from "./context";
import { currentTaskReducer } from "./reducer";
import { TimerWorkerManager } from "../../workers/timerWorker/manager";
import { formatSecondsToMinuts } from "../../utils/formatSecondsToMinuts";
import { ShowMessageAdapter } from "../../adapters/ShowMessageAdapter";

export const taskTypeLabels: Record<CycleModel["type"], string> = {
	workTime: "Foco",
	shortBreakTime: "Descanso rápido",
	longBreakTime: "Descanso longo",
};

type CurrentTaskContextProviderProps = { children: React.ReactNode };

export function CurrentTaskAppContextProvider({ children }: CurrentTaskContextProviderProps) {
	const [currentTask, dispatchCurrentTask] = useReducer(currentTaskReducer, null);
	const worker = TimerWorkerManager.getInstance();
	const showMessage: ShowMessageAdapter = ShowMessageAdapter.getInstance();

	useEffect(() => {
		if (!currentTask || !currentTask.activeCycle) {
			document.title = "Chronos Pomodoro";
			return;
		}

		const taskDesc = currentTask.isPaused
			? "Pausada"
			: taskTypeLabels[currentTask.activeCycle.type];

		const secondsRemaining = formatSecondsToMinuts(currentTask.secondsRemaining);

		document.title = `${secondsRemaining} - ${taskDesc}`;
	}, [currentTask?.secondsRemaining, currentTask?.isPaused]);

	useEffect(() => {
		if (!currentTask) {
			worker.terminate();
			return;
		}

		if (currentTask.status === "Completa") {
			dispatchCurrentTask({ type: "RESET_CURRENT_TASK" });
			showMessage.success("Tarefa completada, confira no histórico!");
			worker.terminate();
			return;
		}

		if (currentTask.status !== "Em progresso") {
			worker.terminate();
			return;
		}

		worker.postMessage(currentTask.secondsRemaining);
	}, [currentTask?.status]);

	useEffect(() => {
		if (!currentTask || !currentTask.activeCycle) return;

		worker.postMessage(currentTask.secondsRemaining);
	}, [currentTask?.currentCycleIndex]);

	useEffect(() => {
		if (!currentTask || !currentTask.activeCycle) return;

		if (currentTask.secondsRemaining === 0) {
			dispatchCurrentTask({ type: "CHANGE_CURRENT_TASK_CYCLE" });
		}
	}, [currentTask?.secondsRemaining]);

	useEffect(() => {
		if (!currentTask || !currentTask.activeCycle) return;

		if (currentTask.completedCycles === currentTask.totalCycles) {
			dispatchCurrentTask({ type: "COMPLETE_CURRENT_TASK" });
		}
	}, [currentTask?.completedCycles]);

	worker.onmessage((e) => {
		if (!currentTask || !currentTask.activeCycle) {
			return;
		}
		const secondsRemaining: number = e.data;

		if (secondsRemaining >= 0) {
			dispatchCurrentTask({ type: "COUNT_DOWN", payload: { secondsRemaining: secondsRemaining } });
			return;
		}
	});

	return (
		<CurrentTaskContext.Provider value={{ currentTask, dispatchCurrentTask }}>
			{children}
		</CurrentTaskContext.Provider>
	);
}
