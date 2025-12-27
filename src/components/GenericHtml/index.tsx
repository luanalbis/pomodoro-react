import styles from "./styles.module.css";

type Props = {
	children: React.ReactNode;
};

export function GenericHtml({ children }: Props) {
	return <div className={styles.genericHtml}>{children}</div>;
}
