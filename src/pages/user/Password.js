import UserNav from "../../components/nav/UserNav";
import { WithUserToken } from "../../hoc/WithUserToken";

const Password = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">user Password page</div>
      </div>
    </div>
  );
};

export default WithUserToken(Password);
