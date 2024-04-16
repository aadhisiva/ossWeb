import { combineReducers } from "redux";
import { userReducers } from "./userReducer";
import { saveuserPathReducer } from "./userPathReducer";

const rootReducers = combineReducers({
    auth: userReducers,
    path: saveuserPathReducer
});

export default rootReducers;