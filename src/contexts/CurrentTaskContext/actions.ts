import type { TaskModel } from "../../models/TaskModel";

export const CurrentTaskActionTypes = {
	NEW_CURRENT_TASK: "NEW_CURRENT_TASK",
	PAUSE_CURRENT_TASK: "PAUSE_CURRENT_TASK",
	RESET_CURRENT_TASK: "RESET_CURRENT_TASK",
	RESTART_CURRENT_TASK: "RESTART_CURRENT_TASK",
	COUNT_DOWN: "COUNT_DOWN",
	CHANGE_CURRENT_TASK_CYCLE: "CHANGE_CURRENT_TASK_CYCLE",
	COMPLETE_CURRENT_TASK: "COMPLETE_CURRENT_TASK",
} as const;

export type CurrentTaskAction =
	| { type: typeof CurrentTaskActionTypes.NEW_CURRENT_TASK; payload: { task: TaskModel } }
	| { type: typeof CurrentTaskActionTypes.COUNT_DOWN; payload: { secondsRemaining: number } }
	| { type: typeof CurrentTaskActionTypes.PAUSE_CURRENT_TASK }
	| { type: typeof CurrentTaskActionTypes.RESTART_CURRENT_TASK }
	| { type: typeof CurrentTaskActionTypes.COMPLETE_CURRENT_TASK }
	| { type: typeof CurrentTaskActionTypes.CHANGE_CURRENT_TASK_CYCLE }
	| { type: typeof CurrentTaskActionTypes.RESET_CURRENT_TASK };
