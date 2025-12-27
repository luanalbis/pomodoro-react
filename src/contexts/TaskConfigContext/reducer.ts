import type { TaskConfig } from "../../models/TaskConfig";
import { TaskConfigActionTypes, type TaskConfigAction } from "./actions";

export function taskConfigReducer(state: TaskConfig, action: TaskConfigAction): TaskConfig {
	if (action.type === TaskConfigActionTypes.CHANGE_SETTINGS) {
		return {
			...state,
			...action.payload.config,
		};
	}

	return state;
}
