import { getNextCycleIndex } from "../../utils/getNextCycleIndex";
import { getCycleType } from "../../utils/getCycleType";
import { useCurrentTaskContext } from "../../contexts/CurrentTaskContext/context";
import { EMPTY_TASK } from "../../models/TaskModel";
import { useTaskConfigContext } from "../../contexts/TaskConfigContext/context";

export function Tips() {
	const { taskConfig } = useTaskConfigContext();
	const { currentTask } = useCurrentTaskContext();
	const showingTask = currentTask ?? EMPTY_TASK;

	const cycle = getNextCycleIndex(showingTask.currentCycleIndex, taskConfig.totalCycles);
	const cycleType = getCycleType(cycle, taskConfig.totalCycles);

	const { workTime, shortBreakTime } = taskConfig.times;
	const isActive = !!showingTask.activeCycle;

	const activeCycleTips = {
		workTime: `Foque por ${workTime} min`,
		shortBreakTime: `Descanse por ${shortBreakTime} min`,
		longBreakTime: "Descanso longo",
	};

	const inactiveCycleTips = {
		workTime: `Próximo ciclo é de ${workTime} min`,
		shortBreakTime: `Próximo descanso é de ${shortBreakTime} min`,
		longBreakTime: "Próximo descanso será longo",
	};

	const taskTips = isActive ? activeCycleTips : inactiveCycleTips;
	const type = isActive ? showingTask.activeCycle!.type : cycleType;

	return <span>{taskTips[type!]}</span>;
}
