import { TimerIcon } from "lucide-react";
import styles from "./styles.module.css";
import { MainRouterLink } from "../MainLink";

export function Logo() {
	return (
		<div className={styles.logo}>
			<MainRouterLink className={styles.logoLink} href="/">
				<TimerIcon />
				<span>Chronos</span>
			</MainRouterLink>
		</div>
	);
}
