import type React from "react";
import styles from "./styles.module.css";

type Props = {
	id: string;
	labelText: string;
} & React.ComponentProps<"input">;

export function InputBase({ id, labelText, ...props }: Props) {
	return (
		<>
			<label htmlFor={id}>{labelText}</label>
			<input className={styles.input} id={id} {...props} />
		</>
	);
}
