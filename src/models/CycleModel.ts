import type { TaskConfig } from "./TaskConfig";

export type CycleModel = {
	duration: number;
	type: keyof TaskConfig["times"];
};
