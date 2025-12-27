let isRunning = false;

self.onmessage = (event: MessageEvent<{ secondsRemaining: number; tickInterval: number }>) => {
	if (isRunning) return;

	isRunning = true;

	const { secondsRemaining, tickInterval } = event.data;

	let countDownSeconds = secondsRemaining;

	function tick() {
		self.postMessage(countDownSeconds);
		countDownSeconds--;
		if (countDownSeconds < 0) {
			isRunning = false;
			return;
		}
		setTimeout(tick, tickInterval);
	}

	tick();
};
