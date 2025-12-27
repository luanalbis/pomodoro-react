import { Container } from "../../components/Container";
import { GenericHtml } from "../../components/GenericHtml";
import { Heading } from "../../components/Heading";
import { SettingsForm } from "../../components/SettingsForm";
import { MainTemplate } from "../../templates/MainTemplate";

export function SettingsPage() {
	return (
		<MainTemplate>
			<Container>
				<Heading>Configurações</Heading>
				<GenericHtml>
					<p style={{ textAlign: "center", fontWeight: "bold" }}>
						Configure os minutos para as etapas do Pomodoro
					</p>
				</GenericHtml>
				<SettingsForm></SettingsForm>
			</Container>
		</MainTemplate>
	);
}
