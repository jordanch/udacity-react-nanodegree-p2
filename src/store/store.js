import reducer from "../reducers/index.reducer";
import { createStore, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(reducer, composeEnhancers());
};
