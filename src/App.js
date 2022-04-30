import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

import Header from "./components/nav/Header";

const App = () => {
  return (
    <>
		<Header/>
	 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
