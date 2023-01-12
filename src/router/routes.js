import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterComplete from "../pages/auth/RegisterComplete";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/auth/ForgotPassword";
import History from "../pages/user/History";
import Password from "../pages/user/Password";
import Wishlist from "../pages/user/Wishlist";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllProducts from "../pages/admin/products/AllProducts";
import CategoryCreate from "../pages/admin/category/CategoryCreate";
import CategoryUpdate from "../pages/admin/category/CategoryUpdate";
import SubCreate from "../pages/admin/sub/SubCreate";
import SubUpdate from "../pages/admin/sub/SubUpdate";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <Shop /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/register/complete", element: <RegisterComplete /> },
  { path: "/forgot/password", element: <ForgotPassword /> },
  { path: "/user/history", element: <History /> },
  { path: "/user/password", element: <Password /> },
  { path: "/user/wishlist", element: <Wishlist /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/products", element: <AllProducts /> },
  { path: "/admin/category", element: <CategoryCreate /> },
  { path: "/admin/category/:slug", element: <CategoryUpdate /> },
  { path: "/admin/sub", element: <SubCreate /> },
  { path: "/admin/sub/:slug", element: <SubUpdate /> },
  { path: "*", element: <NotFound /> },
];
