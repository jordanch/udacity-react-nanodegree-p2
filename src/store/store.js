import reducer from "../reducers/index.reducer";
import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
};
