export function formatTaskDuration(totalMinutes: number) {
	if (totalMinutes < 60) {
		return `${totalMinutes} min`;
	}

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	const formattedMinutes = String(minutes).padStart(2, "0");

	return minutes > 0 ? `${hours}h ${formattedMinutes}min` : `${hours}h`;
}
