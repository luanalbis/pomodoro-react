import type { TaskModel } from "../../models/TaskModel";
import { getNextCycleIndex } from "../../utils/getNextCycleIndex";
import { CurrentTaskActionTypes, type CurrentTaskAction } from "./actions";

export function currentTaskReducer(
	state: TaskModel | null,
	action: CurrentTaskAction
): TaskModel | null {
	switch (action.type) {
		case CurrentTaskActionTypes.NEW_CURRENT_TASK:
			return newCurrentTask(state, action);

		case CurrentTaskActionTypes.COMPLETE_CURRENT_TASK:
			return completeCurrentTask(state);

		case CurrentTaskActionTypes.PAUSE_CURRENT_TASK:
			return pauseCurrentTask(state);

		case CurrentTaskActionTypes.RESTART_CURRENT_TASK:
			return restartCurrentTask(state);

		case CurrentTaskActionTypes.COUNT_DOWN:
			return countDownCurrentTask(state, action);

		case CurrentTaskActionTypes.CHANGE_CURRENT_TASK_CYCLE:
			return changeCurrentTaskCycle(state);

		case CurrentTaskActionTypes.RESET_CURRENT_TASK:
			return null;

		case CurrentTaskActionTypes.RESET_CURRENT_TASK:
			return null;

		default:
			return state;
	}
}

function newCurrentTask(state: TaskModel | null, action: CurrentTaskAction): TaskModel | null {
	if (action.type !== "NEW_CURRENT_TASK") return state;

	return { ...action.payload.task };
}

function completeCurrentTask(state: TaskModel | null): TaskModel | null {
	if (!state) return state;

	return {
		...state,
		finishedAt: Date.now(),
		activeCycle: null,
		status: "Completa",
		currentCycleIndex: 0,
		secondsRemaining: 0,
	};
}

function pauseCurrentTask(state: TaskModel | null): TaskModel | null {
	if (!state) return state;

	return {
		...state,
		isPaused: true,
		status: "Interrompida",
	};
}

function restartCurrentTask(state: TaskModel | null): TaskModel | null {
	if (!state) return state;

	return {
		...state,
		isPaused: false,
		status: "Em progresso",
	};
}

function countDownCurrentTask(
	state: TaskModel | null,
	action: CurrentTaskAction
): TaskModel | null {
	if (!state || action.type !== "COUNT_DOWN") return state;

	return {
		...state,
		secondsRemaining: action.payload.secondsRemaining,
	};
}

function changeCurrentTaskCycle(state: TaskModel | null): TaskModel | null {
	if (!state) return state;

	const nextCycleIndex = getNextCycleIndex(state.currentCycleIndex, state.totalCycles);

	const nextCycle = state.cycles[nextCycleIndex - 1];

	return {
		...state,
		completedCycles: state.completedCycles + 1,
		currentCycleIndex: nextCycleIndex,
		activeCycle: nextCycle,
		secondsRemaining: nextCycle.duration * 60,
	};
}
