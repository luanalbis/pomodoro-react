import { toast } from "react-toastify";
import { ToastDialog } from "../components/ToastDialog";

export class ShowMessageAdapter {
	private static instance: ShowMessageAdapter | null = null;
	private constructor() {}

	public success(message: string) {
		toast.dismiss();
		return toast.success(message);
	}

	public error(message: string) {
		toast.dismiss();
		return toast.error(message);
	}

	public info(message: string) {
		toast.dismiss();
		return toast.info(message);
	}

	public warning(message: string) {
		toast.dismiss();
		return toast.warning(message);
	}

	public dismiss() {
		return toast.dismiss();
	}

	public confirm(data: string, onClosing: (confirmation: boolean) => void) {
		toast(ToastDialog, {
			data,
			autoClose: false,
			closeOnClick: false,
			closeButton: false,
			draggable: false,
			onClose: (answer) => onClosing(!!answer),
		});
	}

	public static getInstance() {
		if (!ShowMessageAdapter.instance) {
			ShowMessageAdapter.instance = new ShowMessageAdapter();
		}
		return ShowMessageAdapter.instance;
	}
}
