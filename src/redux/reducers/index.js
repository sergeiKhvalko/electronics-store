import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	drawer: drawerReducer,
	search: searchReducer,
})

export default rootReducer;