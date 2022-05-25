import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../../components/LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminDashboard = () => {
  const [ok, setOk] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current Admin Res", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <>
      <p>Admin dashboard</p>
    </>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminDashboard;
