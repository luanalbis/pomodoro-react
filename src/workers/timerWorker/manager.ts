let instance: TimerWorkerManager | null = null;
export class TimerWorkerManager {
	private worker: Worker;

	private constructor() {
		this.worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
	}

	public static getInstance(): TimerWorkerManager {
		if (!instance) {
			instance = new TimerWorkerManager();
		}
		return instance;
	}

	public getWorker(): Worker {
		return this.worker;
	}

	public postMessage<T>(message: T) {
		this.worker.postMessage(message);
	}

	public onmessage(cb: (e: MessageEvent) => void) {
		this.worker.addEventListener("message", cb);
	}

	public offMessage(cb: (e: MessageEvent) => void) {
		this.worker.removeEventListener("message", cb);
	}

	public terminate() {
		this.worker.terminate();
		instance = null;
	}
}
