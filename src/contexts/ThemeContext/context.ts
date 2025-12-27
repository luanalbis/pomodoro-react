import { createContext, useContext } from "react";
import type { AvailableThemes } from "../../models/AvailableThemes";

export type ThemeContextProps = {
	theme: AvailableThemes;
	setTheme: React.Dispatch<React.SetStateAction<AvailableThemes>>;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export function useThemeContext() {
	const context = useContext(ThemeContext);

	if (!context) throw new Error("useThemeContext deve ser usado dentro de ThemeContextProvider");

	return context;
}
