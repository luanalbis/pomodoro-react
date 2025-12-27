import styles from "./styles.module.css";
import { ROUTES } from "../../routes";
import { MainRouterLink } from "../MainLink";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<MainRouterLink href={ROUTES.ABOUT_POMODORO}>Entenda como funciona a técnica pomodoro</MainRouterLink>
			<MainRouterLink href={ROUTES.HOME}>
				Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com carinho
			</MainRouterLink>
		</footer>
	);
}
