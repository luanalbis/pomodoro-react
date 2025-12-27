import styles from "./styles.module.css";
import { ROUTES } from "../../routes";
import { MainRouterLink } from "../MainLink";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<MainRouterLink href={ROUTES.ABOUT_POMODORO}>
				Entenda como funciona a técnica pomodoro
			</MainRouterLink>
			<MainRouterLink href={ROUTES.HOME}>
				Chronos &copy; {new Date().getFullYear()} - Feito com carinho por Luan Albis
			</MainRouterLink>
			<div className={styles.socialLinkContainer}>
				<a
					title="Link para LinkedIn de Luan Albis"
					href="https://www.linkedin.com/in/luanalbis"
					target="_blank"
					rel="noopener noreferrer">
					<LinkedinIcon />
				</a>
				<a
					title="Link para Github de Luan Albis"
					href="https://github.com/luanalbis"
					target="_blank"
					rel="noopener noreferrer">
					<GithubIcon />
				</a>
			</div>
		</footer>
	);
}
