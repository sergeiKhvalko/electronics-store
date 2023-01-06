import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartReducer } from "./CartReducer";
import { drawerReducer } from "./DrawerReducer";

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	drawer: drawerReducer,
})

export default rootReducer;