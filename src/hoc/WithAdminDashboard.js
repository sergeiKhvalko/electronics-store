import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../components/LoadingToRedirect";
import { currentAdmin } from "../functions/auth";

export const WithAdminDashboard = (Component) => {
  return function WithAdminDashboardComponent(props) {
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
      if (user && user.token && user.role === "admin") {
        setLoading(true);
        currentAdmin(user.token)
          .then((res) => {
            setLoading(false);
            setOk(true);
          })
          .catch((err) => {
            setLoading(false);
            setOk(false);
          });
      }
    }, [user]);

    return loading ? (
      <div className="text-danger">Loading...</div>
    ) : ok ? (
      <Component {...props} />
    ) : (
      <LoadingToRedirect {...props} />
    );
  };
};
