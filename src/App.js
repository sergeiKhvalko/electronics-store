import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Header from "./components/nav/Header";
import AppRouter from "./components/AppRouter";

const App = () => {
  return (
    <>
		<Header />
		<ToastContainer />
      <AppRouter />
    </>
  );
};

export default App;
