export type TaskConfig = {
	totalCycles: number;
	times: {
		workTime: number;
		shortBreakTime: number;
		longBreakTime: number;
	};
};
