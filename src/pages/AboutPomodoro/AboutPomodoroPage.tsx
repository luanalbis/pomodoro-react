import { Container } from "../../components/Container";
import { GenericHtml } from "../../components/GenericHtml";
import { Heading } from "../../components/Heading";
import { ROUTES } from "../../routes";
import { MainTemplate } from "../../templates/MainTemplate";
import { MainRouterLink } from "../../components/MainLink";

export function AboutPomodoroPage() {
	return (
		<MainTemplate>
			<Container>
				<GenericHtml>
					<Heading>A Técnica Pomodoro</Heading>

					<p>
						A Técnica Pomodoro é uma metodologia de produtividade criada por{" "}
						<strong>Francesco Cirillo</strong>. Consiste em dividir o trabalho em blocos de tempo
						intercalados com pausas, com o objetivo de manter o foco e evitar o cansaço mental.
					</p>

					<img src="https://placehold.co/1920x1080" alt="" />

					<h2>Como funciona o Pomodoro tradicional</h2>
					<ul>
						<li>
							<strong>1. Defina uma tarefa:</strong> escolha o que você deseja realizar.
						</li>
						<li>
							<strong>2. Trabalhe nela por 25 minutos:</strong> sem interrupções.
						</li>
						<li>
							<strong>3. Faça uma pausa curta de 5 minutos.</strong>
						</li>
						<li>
							<strong>4. A cada 4 ciclos, faça uma pausa longa:</strong> geralmente de 15 a 30
							minutos.
						</li>
					</ul>

					<h2>Diferenciais do Chronos Pomodoro</h2>

					<p>
						O app segue o conceito original, mas com algumas melhorias para tornar o processo mais
						eficiente:
					</p>

					<h3>Personalização do tempo</h3>
					<p>
						Você pode configurar os períodos de foco, descanso curto e descanso longo na{" "}
						<MainRouterLink href={ROUTES.SETTINGS}>página de configurações</MainRouterLink>.
					</p>

					<h3>Ciclos organizados em sequência</h3>
					<p>
						Cada ciclo completado é registrado automaticamente no histórico, e o app já sugere o
						próximo ciclo, seja de foco ou descanso.
					</p>
					<p>Nosso padrão:</p>
					<ul>
						<li>Ciclos ímpares: trabalho (foco).</li>
						<li>Ciclos pares: descanso curto.</li>
						<li>Ciclo 8: descanso longo especial, para reiniciar o ciclo completo.</li>
					</ul>

					<h3>Visualização dos ciclos</h3>
					<p>Logo abaixo do cronômetro, bolinhas indicam o tipo de ciclo:</p>
					<ul>
						<li>Amarelo: ciclo de trabalho.</li>
						<li>Verde: descanso curto.</li>
						<li>Azul: descanso longo (aparece a cada 8 ciclos).</li>
					</ul>

					<h3>Histórico automático</h3>
					<p>
						Todas as tarefas e ciclos concluídos ficam salvos no{" "}
						<MainRouterLink href={ROUTES.HISTORY}>histórico</MainRouterLink>, com status de
						completos ou interrompidos. Isso ajuda a acompanhar seu progresso ao longo do tempo.
					</p>

					<h2>Por que usar o Chronos Pomodoro</h2>
					<ul>
						<li>Organize seu foco de forma clara.</li>
						<li>Trabalhe e descanse na medida certa.</li>
						<li>Personalize seus ciclos e tempos de acordo com sua rotina.</li>
						<li>Acompanhe seu histórico de forma automática.</li>
					</ul>

					<p>
						Pronto para começar? Volte para a{" "}
						<MainRouterLink href={ROUTES.HOME}>página inicial</MainRouterLink> e inicie seus ciclos
						de Pomodoro.
					</p>

					<p>
						<em>
							Foque no que importa e respeite os intervalos. Essa é a melhor forma de manter
							produtividade e energia.
						</em>
					</p>
				</GenericHtml>
			</Container>
		</MainTemplate>
	);
}
