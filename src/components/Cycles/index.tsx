import { useCurrentTaskContext } from "../../contexts/CurrentTaskContext/context";
import { useTaskConfigContext } from "../../contexts/TaskConfigContext/context";
import type { CycleModel } from "../../models/CycleModel";
import { EMPTY_TASK } from "../../models/TaskModel";
import { getCycleType } from "../../utils/getCycleType";
import styles from "./styles.module.css";

export function Cycles() {
	const { currentTask } = useCurrentTaskContext();
	const { taskConfig } = useTaskConfigContext();

	const cycleDescription: Record<CycleModel["type"], string> = {
		workTime: "Foco",
		longBreakTime: "Descanso longo",
		shortBreakTime: "Descanso curto",
	};

	const showingTask = currentTask ?? EMPTY_TASK;

	return (
		<div className={styles.cycles}>
			<span>Ciclos:</span>

			<div className={styles.cycleDots}>
				{Array.from({ length: taskConfig.totalCycles }).map((_, i) => {
					const type = getCycleType(i + 1, taskConfig.totalCycles);
					const isOngoing = i + 1 === showingTask.currentCycleIndex;
					const className = `${styles.cycleDot} ${styles[type]} ${isOngoing ? styles.onGoing : ""}`;

					return (
						<span
							key={type + i}
							className={className}
							aria-label="Indicador do foco"
							title={cycleDescription[type]}
						/>
					);
				})}
			</div>
		</div>
	);
}
