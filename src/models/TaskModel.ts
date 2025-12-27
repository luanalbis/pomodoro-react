import type { CycleModel } from "./CycleModel";

export type TaskModel = {
	id: string;
	name: string;
	totalCycles: number;
	cycles: CycleModel[];
	secondsRemaining: number;
	activeCycle: CycleModel | null;
	completedCycles: number;
	currentCycleIndex: number;
	status: "Abandonada" | "Completa" | "Interrompida" | "Em progresso";

	createdAt: number;
	finishedAt: number | null;
	isPaused: boolean;
};

export const EMPTY_TASK: TaskModel = {
	id: "",
	name: "",
	activeCycle: null,
	cycles: [],
	currentCycleIndex: 0,
	completedCycles: 0,
	totalCycles: 0,
	secondsRemaining: 0,
	status: "Interrompida",
	createdAt: Date.now(),
	finishedAt: null,
	isPaused: false,
};
