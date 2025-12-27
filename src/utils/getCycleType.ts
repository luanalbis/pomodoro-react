import type { CycleModel } from "../models/CycleModel";

export function getCycleType(currentCycle: number, totalCycles: number): CycleModel["type"] {
	if (totalCycles < 3 || totalCycles > 8) {
		throw new Error(`totalCycles must be between 3 and 8, got ${totalCycles}`);
	}

	if (currentCycle <= 0) {
		throw new Error(`currentCycle must be between 1 and ${totalCycles}`);
	}

	if (currentCycle % totalCycles === 0) return "longBreakTime";
	if (currentCycle % 2 === 0) return "shortBreakTime";
	return "workTime";
}
