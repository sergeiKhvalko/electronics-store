import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../components/LoadingToRedirect";
import { currentAdmin } from "../functions/auth";

export const WithAdminDashboard = (Component) => {
  return function WithAdminDashboardComponent(props) {
    const [ok, setOk] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    useLayoutEffect(() => {
      if (user && user.token && user.role === "admin") {
				setOk(true);
        currentAdmin(user.token)
          .then((res) => {
            setOk(res.data.role === "admin");
          })
          .catch((err) => {
            setOk(false);
          });
      }
    }, [user]);

    return ok ? <Component {...props} /> : <LoadingToRedirect {...props} />;
  };
};
