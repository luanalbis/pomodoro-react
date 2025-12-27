export function formatSecondsToMinuts(seconds: number): string {
	const minuts = String(Math.floor(seconds / 60)).padStart(2, "0");
	const secondsMod = String(Math.floor(seconds % 60)).padStart(2, "0");

	return `${minuts}:${secondsMod}`;
}
