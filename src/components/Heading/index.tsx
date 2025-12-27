import styles from "./styles.module.css";
type Props = {
	children: React.ReactNode;
};

export function Heading(props: Props) {
	return <h1 className={styles.heading}>{props.children}</h1>;
}
