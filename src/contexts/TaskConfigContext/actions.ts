import type { TaskConfig } from "../../models/TaskConfig";

export const TaskConfigActionTypes = {
	CHANGE_SETTINGS: "CHANGE_SETTINGS",
} as const;

export type TaskConfigAction = {
	type: typeof TaskConfigActionTypes.CHANGE_SETTINGS;
	payload: { config: TaskConfig };
};
