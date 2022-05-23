import { useSelector } from "react-redux";
import LoadingToRedirect from "../components/LoadingToRedirect";

export const WithUserToken = (Component) => {
  return function WithUserTokenComponent(props) {
    const { user } = useSelector((state) => ({ ...state }));
    return user && user.token ? (
      <Component {...props} />
    ) : (
      <LoadingToRedirect {...props} />
    );
  };
};
