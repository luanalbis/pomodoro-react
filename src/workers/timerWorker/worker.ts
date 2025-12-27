let isRunning = false;

self.onmessage = (event: MessageEvent<number>) => {
	if (isRunning) return;

	isRunning = true;

	const secondsRemaining = event.data;

	let countDownSeconds = secondsRemaining;

	function tick() {
		self.postMessage(countDownSeconds);
		countDownSeconds--;
		if (countDownSeconds < 0) {
			isRunning = false;
			return;
		}
		setTimeout(tick, 1000);
	}

	tick();
};
