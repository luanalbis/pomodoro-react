import { useState } from "react";
import { PlayCircleIcon, StopCircleIcon, TrashIcon } from "lucide-react";

import { ButtonBase } from "../ButtonBase";
import { Cycles } from "../Cycles";
import { InputBase } from "../InputBase";
import { Tips } from "../Tips";

import { useTaskConfigContext } from "../../contexts/TaskConfigContext/context";

import type { CycleModel } from "../../models/CycleModel";

import { getNextCycleIndex } from "../../utils/getNextCycleIndex";
import { getCycleType } from "../../utils/getCycleType";

import styles from "./styles.module.css";

import { ShowMessageAdapter } from "../../adapters/ShowMessageAdapter";
import type { TaskModel } from "../../models/TaskModel";
import { useCurrentTaskContext } from "../../contexts/CurrentTaskContext/context";
import { useTaskHistoryContext } from "../../contexts/TaskHistoryContext/context";

export function MainForm() {
	const showMessage = ShowMessageAdapter.getInstance();

	const { taskConfig } = useTaskConfigContext();

	const { history, dispatchHistory } = useTaskHistoryContext();
	const { currentTask, dispatchCurrentTask } = useCurrentTaskContext();
	const [taskName, setTaskName] = useState<string>(() => {
		return history[history.length - 1]?.name || "";
	});

	function handleCreateTask(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();

		if (currentTask) return;

		if (!taskName || taskName.trim().length == 0) {
			showMessage.warning("Digite o nome da tarefa");
			return;
		}

		const cycles = [];
		const totalCycles = taskConfig.totalCycles;
		const timesConfig = taskConfig.times;

		for (let i = 0; i < totalCycles; i++) {
			const nextCycleIndex: number = getNextCycleIndex(i, totalCycles);
			const cycleType: CycleModel["type"] = getCycleType(nextCycleIndex, totalCycles);

			const cycle: CycleModel = {
				duration: timesConfig[cycleType],
				type: cycleType,
			};

			cycles.push(cycle);
		}

		const cycle = cycles[0];
		const task: TaskModel = {
			id: String(Date.now()),
			name: taskName,
			activeCycle: cycle,
			currentCycleIndex: 1,
			completedCycles: 0,
			cycles,
			secondsRemaining: cycle.duration * 60,
			status: "Em progresso",
			totalCycles,
			createdAt: Date.now(),
			finishedAt: null,
			isPaused: false,
		};

		dispatchHistory({ type: "ADD_TO_HISTORY", payload: { task } });
		dispatchCurrentTask({
			type: "NEW_CURRENT_TASK",
			payload: {
				task,
			},
		});
		showMessage.success("Tarefa criada");
	}

	function handlePauseTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();

		if (!currentTask) return;

		dispatchCurrentTask({ type: "PAUSE_CURRENT_TASK" });
		showMessage.warning("Tarefa pausada.");
	}

	function handleRestartTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();

		if (!currentTask || currentTask.status !== "Interrompida") return;

		dispatchCurrentTask({ type: "RESTART_CURRENT_TASK" });
		showMessage.success("Tarefa retornada");
	}

	function handleDeleteTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (!currentTask || currentTask.status !== "Interrompida") return;

		e.preventDefault();

		showMessage.dismiss();
		showMessage.confirm("Deseja remover a tarefa?", (confirmation: boolean) => {
			if (confirmation) {
				dispatchHistory({ type: "REMOVE_TASK_IN_HISTORY", payload: { taskId: currentTask?.id } });
				dispatchCurrentTask({ type: "RESET_CURRENT_TASK" });
			}
		});
	}

	const hasActiveTask = !!currentTask;

	const isTaskPaused = hasActiveTask && currentTask.status == "Interrompida";

	return (
		<form onSubmit={handleCreateTask} className={styles.form}>
			{!hasActiveTask && (
				<div className={styles.formRow}>
					<InputBase
						id="taskNameId"
						maxLength={30}
						type="text"
						labelText="Nome da tarefa:"
						placeholder="Digite o nome da tarefa..."
						onChange={(e) => setTaskName(e.target.value)}
						defaultValue={taskName}
					/>
				</div>
			)}

			{hasActiveTask && <h2 style={{ fontWeight: "bolder" }}>{currentTask.name.toUpperCase()}</h2>}

			<div className={styles.formRow}>
				<Cycles />
			</div>

			<div className={styles.formRow}>
				<Tips />
			</div>

			<div className={styles.formRow}>
				{!hasActiveTask && (
					<ButtonBase
						aria-label="Iniciar nova tarefa"
						title="Iniciar nova tarefa"
						color="green"
						icon={<PlayCircleIcon />}
						type="submit"
					/>
				)}

				{hasActiveTask && (
					<ButtonBase
						aria-label={!isTaskPaused ? "Pausar tarefa atual" : "Retornar tarefa"}
						title={!isTaskPaused ? "Pausar tarefa atual" : "Retornar tarefa"}
						color={!isTaskPaused ? "red" : "green"}
						icon={!isTaskPaused ? <StopCircleIcon /> : <PlayCircleIcon />}
						type={!isTaskPaused ? "button" : "submit"}
						onClick={!isTaskPaused ? handlePauseTask : handleRestartTask}
					/>
				)}

				{hasActiveTask && isTaskPaused && (
					<ButtonBase
						aria-label="Excluir tarefa atual"
						title="Excluir tarefa atual"
						color="red"
						icon={<TrashIcon />}
						type="button"
						onClick={handleDeleteTask}
					/>
				)}
			</div>
		</form>
	);
}
