import { Footer } from "../../components/Footer";
import { Logo } from "../../components/Logo";
import { Container } from "../../components/Container";
import { Menu } from "../../components/Menu";

type Props = {
	children: React.ReactNode;
};

export function MainTemplate({ children }: Props) {
	return (
		<>
			<Container>
				<Logo />
			</Container>

			<Container>
				<Menu />
			</Container>

			{children}

			<Container>
				<Footer />
			</Container>
		</>
	);
}
