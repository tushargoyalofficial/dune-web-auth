import { Route, Routes } from "react-router";
import LoginRedirect from "./pages/LoginRedirect";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route index path="/" element={<Home />} />
			<Route
				path="/connect/:providerName/redirect"
				element={<LoginRedirect />}
			/>
			<Route path="/profile" element={<Profile />} />
		</Routes>
	);
}

export default App;
