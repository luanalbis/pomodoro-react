import { useEffect, useState } from "react";
import type { AvailableThemes } from "../../models/AvailableThemes";
import { ThemeContext } from "./context";

type ThemeContextProviderProps = { children: React.ReactNode };

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
	const [theme, setTheme] = useState<AvailableThemes>(() => {
		return (localStorage.getItem("theme") as AvailableThemes) || "dark";
	});

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
