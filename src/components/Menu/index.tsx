import { HistoryIcon, HomeIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { type JSX } from "react";
import { ROUTES } from "../../routes";
import { MainRouterLink } from "../MainLink";
import { useThemeContext } from "../../contexts/ThemeContext/context";
import type { AvailableThemes } from "../../models/AvailableThemes";

export function Menu() {
	const { theme, setTheme } = useThemeContext();

	function handleSetTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		event.preventDefault();
		setTheme((prev) => {
			return prev === "dark" ? "light" : "dark";
		});
	}

	const themeIcon: Record<AvailableThemes, JSX.Element> = {
		dark: <SunIcon />,
		light: <MoonIcon />,
	};

	return (
		<nav className={styles.menuNav}>
			<MainRouterLink
				className={styles.menuLink}
				href={ROUTES.HOME}
				aria-label="Ir para home"
				title="Ir para home">
				<HomeIcon />
			</MainRouterLink>
			<MainRouterLink
				className={styles.menuLink}
				href={ROUTES.HISTORY}
				title="Ir para histórico"
				aria-label="Ir para histórico">
				<HistoryIcon />
			</MainRouterLink>
			<MainRouterLink
				className={styles.menuLink}
				href={ROUTES.SETTINGS}
				title="Ir para Configurações"
				aria-label="Ir para Configurações">
				<SettingsIcon />
			</MainRouterLink>
			<a
				onClick={handleSetTheme}
				className={styles.menuLink}
				href=""
				title="Mudar tema"
				aria-label="Mudar tema">
				{themeIcon[theme]}
			</a>
		</nav>
	);
}
