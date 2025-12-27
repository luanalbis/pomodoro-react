import { SaveIcon } from "lucide-react";

import { ButtonBase } from "../ButtonBase";
import { InputBase } from "../InputBase";

import styles from "./styles.module.css";
import { useRef, useState } from "react";
import { useTaskConfigContext } from "../../contexts/TaskConfigContext/context";
import { ShowMessageAdapter } from "../../adapters/ShowMessageAdapter";
import { TaskConfigActionTypes } from "../../contexts/TaskConfigContext/actions";
import { useCurrentTaskContext } from "../../contexts/CurrentTaskContext/context";
import type { TaskConfig } from "../../models/TaskConfig";

export function SettingsForm() {
	const { taskConfig, dispatchTaskConfig } = useTaskConfigContext();
	const { currentTask } = useCurrentTaskContext();

	const [storageConfig] = useState<TaskConfig>(() => {
		const stored = localStorage.getItem("taskConfig");
		if (!stored) return taskConfig;

		try {
			return JSON.parse(stored) as TaskConfig;
		} catch {
			return taskConfig;
		}
	});

	const [mode, setMode] = useState(taskConfig.mode);

	const totalCyclesInput = useRef<HTMLInputElement>(null);
	const workTimeInput = useRef<HTMLInputElement>(null);
	const shortBreakTimeInput = useRef<HTMLInputElement>(null);
	const longBreakTimeInput = useRef<HTMLInputElement>(null);

	const showMessage = ShowMessageAdapter.getInstance();

	function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (currentTask) {
			showMessage.error("Não é possível alterar as configurações durante uma tarefa.");
			return;
		}

		if (mode === "teste") {
			handleTestSettings();
		} else {
			handleNormalSettings();
		}
	}

	function handleTestSettings() {
		dispatchTaskConfig({
			type: TaskConfigActionTypes.CHANGE_SETTINGS,
			payload: {
				config: {
					...taskConfig,
					totalCycles: 8,
					times: {
						workTime: 1,
						shortBreakTime: 1,
						longBreakTime: 1,
					},
					mode: "teste",
				},
			},
		});
		showMessage.success("Configuração salva.");
	}

	function handleNormalSettings() {
		const totalCycles = Number(totalCyclesInput.current?.value);
		const workTime = Number(workTimeInput.current?.value);
		const shortBreakTime = Number(shortBreakTimeInput.current?.value);
		const longBreakTime = Number(longBreakTimeInput.current?.value);

		if (isNaN(totalCycles) || totalCycles < 3 || totalCycles > 8) {
			showMessage.error("Total de ciclos inválido. Deve ser um número entre 3 e 8.");
			return;
		}

		if (isNaN(workTime) || workTime < 10 || workTime > 60) {
			showMessage.error("Tempo de trabalho inválido. Deve ser um número entre 10 e 60 minutos.");
			return;
		}

		if (isNaN(shortBreakTime) || shortBreakTime < 10 || shortBreakTime > 60) {
			showMessage.error("Tempo de pausa curta inválido. Deve ser um número entre 10 e 60 minutos.");
			return;
		}

		if (isNaN(longBreakTime) || longBreakTime < 10 || longBreakTime > 60) {
			showMessage.error("Tempo de pausa longa inválido. Deve ser um número entre 10 e 60 minutos.");
			return;
		}

		dispatchTaskConfig({
			type: TaskConfigActionTypes.CHANGE_SETTINGS,
			payload: {
				config: {
					...taskConfig,
					mode: "normal",
					totalCycles,
					times: { workTime, shortBreakTime, longBreakTime },
				},
			},
		});

		showMessage.success("Configuração salva.");
	}

	function handleToggleMode(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		e.preventDefault();
		setMode((prev) => {
			return prev === "normal" ? "teste" : "normal";
		});
	}

	return (
		<form onSubmit={handleSaveSettings} className={styles.form}>
			<div className={styles.formRow}>
				<button type="button" className={styles.modeToggleButton} onClick={handleToggleMode}>
					Alternar modo ({mode.toLocaleUpperCase()})
				</button>
			</div>

			{mode === "teste" && (
				<div className={styles.testModeMessage}>
					<p>
						<strong>Modo Teste</strong>. Aqui é possível ver como o Pomodoro funciona e acompanhar
						os ciclos rapidamente.
					</p>
					<p>Nesse modo você terá configurações fixas para testar as funcionalidades do app.</p>
					<p>Todos os timers serão fixos um tempo de 1 minuto e com velocidade acelerada em 10x</p>
				</div>
			)}

			{mode === "normal" && (
				<>
					<div className={styles.formRow}>
						<InputBase
							id="totalCyclesInput"
							type="number"
							labelText="Total de ciclos (minimo 3, máximo 8)"
							placeholder="Total de Ciclos..."
							ref={totalCyclesInput}
							defaultValue={storageConfig.totalCycles}
						/>
					</div>

					<div className={styles.formRow}>
						<InputBase
							id="workTime"
							type="number"
							labelText="Tempo de foco (minutos)"
							placeholder="Foco..."
							ref={workTimeInput}
							defaultValue={storageConfig.times.workTime}
						/>
					</div>

					<div className={styles.formRow}>
						<InputBase
							id="shortBreakTime"
							type="number"
							labelText="Tempo de descanso curto (minutos)"
							placeholder="Descanso curto..."
							ref={shortBreakTimeInput}
							defaultValue={storageConfig.times.shortBreakTime}
						/>
					</div>

					<div className={styles.formRow}>
						<InputBase
							id="longBreakTime"
							type="number"
							labelText="Tempo de descanso longo (minutos)"
							placeholder="Descanso longo..."
							ref={longBreakTimeInput}
							defaultValue={storageConfig.times.longBreakTime}
						/>
					</div>
				</>
			)}

			<ButtonBase
				aria-label="Salvar configurações"
				title="Salvar configurações"
				color="green"
				type="submit"
				icon={<SaveIcon />}
			/>
		</form>
	);
}
