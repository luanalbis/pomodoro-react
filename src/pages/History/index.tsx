import { TrashIcon } from "lucide-react";
import { ButtonBase } from "../../components/ButtonBase";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from "./styles.module.css";
import { ShowMessageAdapter } from "../../adapters/ShowMessageAdapter";
import { useTaskHistoryContext } from "../../contexts/TaskHistoryContext/context";
import { formatDateTime } from "../../utils/formatDateTime";
import { formatTaskDuration } from "../../utils/formatTaskDuration";

export function HistoryPage() {
	const { history, dispatchHistory } = useTaskHistoryContext();
	const showMessage = ShowMessageAdapter.getInstance();

	function handleCleanHistory(e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void {
		e.preventDefault();

		if (history.length == 0) {
			showMessage.error("Voce ainda não possui tarefas");
			return;
		}

		showMessage.confirm("Confirmar exclusão", (confirmed) => {
			if (confirmed) dispatchHistory({ type: "CLEAN_HISTORY" });
		});
	}

	const hasTask = history.length > 0 || false;

	return (
		<MainTemplate>
			{hasTask && (
				<Container>
					<Heading>
						<span>Histórico</span>
						<span className={styles.buttonContainer}>
							<ButtonBase
								icon={<TrashIcon />}
								color={"red"}
								aria-label="Apagar histórico"
								title="Apagar histórico"
								onClick={handleCleanHistory}
							/>
						</span>
					</Heading>
				</Container>
			)}
			<Container>
				{hasTask && (
					<div className={styles.responsiveTable}>
						<table>
							<thead>
								<tr>
									<th>Tarefa</th>
									<th>Status</th>
									<th>Ciclos</th>
									<th>Duração </th>
									<th>Inicio</th>
									<th>Fim</th>
								</tr>
							</thead>
							<tbody>
								{[...history].map((task, i) => (
									<tr key={task.id + i}>
										<td>{task.name}</td>
										<td>{task.status}</td>
										<td>{task.totalCycles}</td>
										<td>
											{formatTaskDuration(task.cycles.reduce((total, c) => total + c.duration, 0))}
										</td>

										<td>{formatDateTime(task.createdAt)}</td>
										<td>{task.finishedAt ? formatDateTime(task.finishedAt) : ""}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{!hasTask && (
					<p style={{ textAlign: "center", fontWeight: "bold" }}>
						Ainda não existem tarefas criadas.
					</p>
				)}
			</Container>
		</MainTemplate>
	);
}
