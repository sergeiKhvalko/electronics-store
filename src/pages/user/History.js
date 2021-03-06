import UserNav from "../../components/nav/UserNav";
import { WithUserToken } from "../../hoc/WithUserToken";

const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">user history page</div>
      </div>
    </div>
  );
};

export default WithUserToken(History);
