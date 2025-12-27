export type TaskConfig = {
	mode: "normal" | "teste";
	totalCycles: number;
	times: {
		workTime: number;
		shortBreakTime: number;
		longBreakTime: number;
	};
};
