import styles from "./styles.module.css";

type Props = {
	children: React.ReactNode;
};
export function Container({ children }: Props) {
	return (
		<div className={styles.container}>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
