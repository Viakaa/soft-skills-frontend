import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import authReducer from "./Reducers/userReducers";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) 
);

export default store;
