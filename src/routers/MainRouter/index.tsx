import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AboutPomodoroPage } from "../../pages/AboutPomodoro/AboutPomodoroPage";
import { HomePage } from "../../pages/Home";
import { NotFoundPage } from "../../pages/NotFound";
import { ROUTES } from "../../routes";
import { useEffect } from "react";
import { HistoryPage } from "../../pages/History";
import { SettingsPage } from "../../pages/Settings";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	return null;
}

export function MainRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.HOME} element={<HomePage />}></Route>
				<Route path={ROUTES.ABOUT_POMODORO} element={<AboutPomodoroPage />}></Route>
				<Route path={ROUTES.HISTORY} element={<HistoryPage />}></Route>
				<Route path={ROUTES.SETTINGS} element={<SettingsPage />}></Route>

				<Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />}></Route>
			</Routes>
			<ScrollToTop></ScrollToTop>
		</BrowserRouter>
	);
}
