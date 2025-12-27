import type { TaskModel } from "../../models/TaskModel";

export const TaskHistoryActionTypes = {
	ADD_TO_HISTORY: "ADD_TO_HISTORY",
	UPDATE_TASK_IN_HISTORY: "UPDATE_TASK_IN_HISTORY",
	CLEAN_HISTORY: "CLEAN_HISTORY",
} as const;

export type TaskHistoryAction =
	| { type: typeof TaskHistoryActionTypes.ADD_TO_HISTORY; payload: { task: TaskModel } }
	| { type: typeof TaskHistoryActionTypes.UPDATE_TASK_IN_HISTORY; payload: { task: TaskModel } }
	| { type: typeof TaskHistoryActionTypes.CLEAN_HISTORY };
