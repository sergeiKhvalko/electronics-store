import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../components/LoadingToRedirect";
import { currentAdmin } from "../functions/auth";

export const WithAdminDashboard = (Component) => {
  return function WithAdminDashboardComponent(props) {
    const [ok, setOk] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
      if (user && user.token && user.role === "admin") {
        currentAdmin(user.token)
          .then((res) => {
            setOk(true);
          })
          .catch((err) => {
            setOk(false);
          });
      }
    }, [user]);

    return ok ? <Component {...props} /> : <LoadingToRedirect {...props} />;
  };
};
