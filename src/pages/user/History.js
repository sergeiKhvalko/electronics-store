import { useSelector } from "react-redux";
import LoadingToRedirect from "../../components/LoadingToRedirect";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <div className="container-fluid">
      <div className="row">
        <div className="col">user history page</div>
      </div>
    </div>
  ) : (
    <LoadingToRedirect />
  );
};

export default History;
