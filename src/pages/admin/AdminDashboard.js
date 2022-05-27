import AdminNav from "../../components/nav/AdminNav";
import { WithAdminDashboard } from "../../hoc/WithAdminDashboard";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">admin dashboard page</div>
      </div>
    </div>
  );
};

export default WithAdminDashboard(AdminDashboard);
