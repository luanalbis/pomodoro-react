import { ToastContainer, Bounce } from "react-toastify";

type Props = {
	children: React.ReactNode;
};

export function MessagesContainer({ children }: Props) {
	return (
		<>
			{children}
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={true}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
		</>
	);
}
