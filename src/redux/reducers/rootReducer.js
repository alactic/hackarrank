import { combineReducers } from "redux";
import hackerTestReducer from "./hackerTest/hackerTest";

export default combineReducers({
  hackerTest: hackerTestReducer
});
