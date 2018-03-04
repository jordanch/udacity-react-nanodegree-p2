// TODO: change index reducer to index.js, then split out reducers from root (index) reducer.

import { combineReducers } from "redux";
import posts from "./posts.reducer";
import comments from "./comments.reducer";
import categories from "./categories.reducer";

export default combineReducers({
  comments,
  posts,
  categories
});
