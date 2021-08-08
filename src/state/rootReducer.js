import { combineReducers } from "redux";
import userSettings from "./management/userSettings";
import songGraph from "./management/songGraph";

const rootReducer = combineReducers({
  userSettings: userSettings,
  songGraph: songGraph,
});

export default rootReducer;
