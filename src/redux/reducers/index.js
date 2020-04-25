import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import authors from "./authorReducer";
import courses from "./courseReducer";

const rootReducers = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducers;
