import UserNav from "../../components/nav/UserNav";
import { WithUserToken } from "../../hoc/WithUserToken";

const Wishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">user Wishlist page</div>
      </div>
    </div>
  );
};

export default WithUserToken(Wishlist);
