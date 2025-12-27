import { useCurrentTaskContext } from "../../contexts/CurrentTaskContext/context";
import { EMPTY_TASK } from "../../models/TaskModel";
import { formatSecondsToMinuts } from "../../utils/formatSecondsToMinuts";
import styles from "./styles.module.css";

export function CountDown() {
	const { currentTask } = useCurrentTaskContext();
	const showingTask = currentTask ?? EMPTY_TASK;

	return (
		<div className={styles.container}>{formatSecondsToMinuts(showingTask.secondsRemaining)}</div>
	);
}
