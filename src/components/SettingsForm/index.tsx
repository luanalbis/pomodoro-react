import { SaveIcon } from "lucide-react";

import { ButtonBase } from "../ButtonBase";
import { InputBase } from "../InputBase";

import styles from "./styles.module.css";
import { useRef } from "react";
import { useTaskConfigContext } from "../../contexts/TaskConfigContext/context";
import { ShowMessageAdapter } from "../../adapters/ShowMessageAdapter";
import { TaskConfigActionTypes } from "../../contexts/TaskConfigContext/actions";
import { useCurrentTaskContext } from "../../contexts/CurrentTaskContext/context";

export function SettingsForm() {
	const { taskConfig, dispatchTaskConfig } = useTaskConfigContext();
	const { currentTask } = useCurrentTaskContext();

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
			payload: { config: { totalCycles, times: { workTime, shortBreakTime, longBreakTime } } },
		});

		showMessage.success("Configuração salva.");
	}

	return (
		<form onSubmit={handleSaveSettings} className={styles.form}>
			<div className={styles.formRow}>
				<InputBase
					id="totalCyclesInput"
					type="number"
					labelText="Total de ciclos (minimo 3, máximo 8)"
					placeholder="Total de Ciclos..."
					ref={totalCyclesInput}
					defaultValue={taskConfig.totalCycles}
				/>
			</div>

			<div className={styles.formRow}>
				<InputBase
					id="workTime"
					type="number"
					labelText="Tempo de foco (minutos)"
					placeholder="Foco..."
					ref={workTimeInput}
					defaultValue={taskConfig.times.workTime}
				/>
			</div>
			<div className={styles.formRow}>
				<InputBase
					id="shortBreakTime"
					type="number"
					labelText="Tempo de descanso curto (minutos)"
					placeholder="Descanso curto..."
					ref={shortBreakTimeInput}
					defaultValue={taskConfig.times.shortBreakTime}
				/>
			</div>

			<div className={styles.formRow}>
				<InputBase
					id="longBreakTime"
					type="number"
					labelText="Tempo de descanso longo (minutos)"
					placeholder="Descanso longo..."
					ref={longBreakTimeInput}
					defaultValue={taskConfig.times.longBreakTime}
				/>
			</div>
			<ButtonBase
				aria-label="Salvar configurações"
				title="Salvar configurações"
				color="green"
				type="submit"
				icon={<SaveIcon />}></ButtonBase>
		</form>
	);
}
