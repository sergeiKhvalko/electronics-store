import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterComplete from "../pages/auth/RegisterComplete";
import NotFound from "../pages/NotFound";

export const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register />},
	{ path: "/register/complete", element: <RegisterComplete />},
	{ path: "*", element: <NotFound /> },
]

