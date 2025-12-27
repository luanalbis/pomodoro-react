import { Link } from "react-router";

type MainRouterLinkProps = {
	children: React.ReactNode;
	href: string;
} & React.ComponentProps<"a">;

export function MainRouterLink(props: MainRouterLinkProps) {
	const { href, children } = props;

	return (
		<Link to={href} {...props}>
			{children}
		</Link>
	);
}
