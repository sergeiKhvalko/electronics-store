import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/nav/Header";
import AppRouter from "./components/AppRouter";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
				token: idTokenResult.token
          },
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <AppRouter />
    </>
  );
};

export default App;
