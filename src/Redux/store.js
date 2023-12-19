import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from "redux-thunk";
import authReducer from './Reducers/userReducers';

const reducer = combineReducers({
  auth: authReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
