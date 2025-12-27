import type React from "react";
import styles from "./styles.module.css";

type Props = {
	icon: React.ReactNode;
	color: "red" | "green";
} & React.ComponentProps<"button">;

export function ButtonBase({ color, icon, ...props }: Props) {
	return (
		<>
			<button className={`${styles.button} ${styles[color]}`} {...props}>
				{icon}
			</button>
		</>
	);
}
