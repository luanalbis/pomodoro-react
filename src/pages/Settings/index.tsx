import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { SettingsForm } from "../../components/SettingsForm";
import { MainTemplate } from "../../templates/MainTemplate";

export function SettingsPage() {
	return (
		<MainTemplate>
			<Container>
				<Heading>Configurações</Heading>
				<SettingsForm></SettingsForm>
			</Container>
		</MainTemplate>
	);
}
