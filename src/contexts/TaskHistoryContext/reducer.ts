import type { TaskModel } from "../../models/TaskModel";

import { type TaskHistoryAction } from "./actions";

export function historyReducer(state: TaskModel[], action: TaskHistoryAction): TaskModel[] {
	if (action.type === "ADD_TO_HISTORY") {
		return [...state, action.payload.task];
	}

	if (action.type === "UPDATE_TASK_IN_HISTORY") {
		return state.map((task) =>
			task.id === action.payload.task.id ? { ...task, ...action.payload.task } : task
		);
	}

	if (action.type === "CLEAN_HISTORY") {
		return [];
	}

	return state;
}
