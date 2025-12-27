import { TaskConfigContextProvider } from "../contexts/TaskConfigContext/provider";
import { MessagesContainer } from "../components/MessagesContainer";
import { MainRouter } from "../routers/MainRouter";
import { ThemeContextProvider } from "../contexts/ThemeContext/provider";
import { CurrentTaskAppContextProvider } from "../contexts/CurrentTaskContext/provider";
import { TaskHistoryContextProvider } from "../contexts/TaskHistoryContext/provider";

export function App() {
	return (
		<ThemeContextProvider>
			<TaskConfigContextProvider>
				<CurrentTaskAppContextProvider>
					<TaskHistoryContextProvider>
						<MessagesContainer>
							<MainRouter />
						</MessagesContainer>
					</TaskHistoryContextProvider>
				</CurrentTaskAppContextProvider>
			</TaskConfigContextProvider>
		</ThemeContextProvider>
	);
}
