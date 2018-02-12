// TODO: change index reducer to index.js, then split out reducers from root (index) reducer.

import { combineReducers } from "redux";
import posts from "./posts.reducer";

// TODO: update post entity to include property for commentIds[1, 2, ...]

const initialCommentsState = {
  byId: {
    "894tuq4ut84ut8v4t8wun89g": {
      id: "894tuq4ut84ut8v4t8wun89g",
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: "Hi there! I am a COMMENT.",
      author: "thingtwo",
      voteScore: 6,
      deleted: false,
      parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
      id: "8tu4bsun805n8un48ve89",
      parentId: "6ni6ok3ym7mf1p33lnez",
      timestamp: 1469479767190,
      body: "Comments. Are. Cool.",
      author: "thingone",
      voteScore: -5,
      deleted: false,
      parentDeleted: false
    }
  },
  allIds: ["8tu4bsun805n8un48ve89", "894tuq4ut84ut8v4t8wun89g"]
};

function comments(state = initialCommentsState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  comments,
  posts
});
