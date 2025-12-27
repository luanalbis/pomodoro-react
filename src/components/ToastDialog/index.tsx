import { type ToastContentProps } from "react-toastify";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { ButtonBase } from "../ButtonBase";

import styles from "./styles.module.css";

export function ToastDialog({ closeToast, data }: ToastContentProps<string>) {
	return (
		<>
			<div className={styles.container}>
				<p>{data}</p>

				<div className={styles.buttonsContainer}>
					<ButtonBase
						onClick={() => closeToast(true)}
						icon={<ThumbsUpIcon />}
						aria-label="Confirmar ação e fechar"
						title="Confirmar ação e fechar"
						color={"green"}
					/>
					<ButtonBase
						onClick={() => closeToast(false)}
						icon={<ThumbsDownIcon />}
						color="red"
						aria-label="Cancelar ação e fechar"
						title="Cancelar ação e fechar"
					/>
				</div>
			</div>
		</>
	);
}
