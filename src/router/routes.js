import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterComplete from "../pages/auth/RegisterComplete";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/auth/ForgotPassword";
import History from "../pages/user/History";
import Password from "../pages/user/Password";
import Wishlist from "../pages/user/Wishlist";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/register/complete", element: <RegisterComplete /> },
  { path: "/forgot/password", element: <ForgotPassword /> },
  { path: "/user/history", element: <History /> },
  { path: "/user/password", element: <Password /> },
  { path: "/user/wishlist", element: <Wishlist /> },
  { path: "*", element: <NotFound /> },
];
