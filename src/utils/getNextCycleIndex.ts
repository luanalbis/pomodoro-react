export function getNextCycleIndex(currentCycle: number, totalCycles: number): number {
	if (totalCycles < 3 || totalCycles > 8) {
		throw new Error(totalCycles + " cycle must be between 3 and 8");
	}
	if (currentCycle < 0 || currentCycle > totalCycles) {
		throw new Error("cycle must be between 0 and " + totalCycles);
	}
	return currentCycle < totalCycles ? currentCycle + 1 : totalCycles;
}
