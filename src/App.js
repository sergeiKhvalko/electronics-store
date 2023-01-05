import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/nav/Header";
import Footer from "./components/footer/Footer";
import AppRouter from "./router/AppRouter";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
		<div className="MainWrapper">
			<div className="MainLayout">
				<Header />
				<ToastContainer />

				<main style={{flex: "1 0 auto", padding: "40px 0"}}>
					<AppRouter />
				</main>

				<Footer/>
			</div>
    </div>
  );
};

export default App;
