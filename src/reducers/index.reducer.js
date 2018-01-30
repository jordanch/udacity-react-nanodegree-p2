// TODO: change index reducer to index.js, then split out reducers from root (index) reducer.

import { combineReducers } from "redux";

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

const initialPostsState = {
  byId: {
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1467166872634,
      title: "Udacity is the best place to learn React",
      body: "Everyone says so after all.",
      author: "thingtwo",
      category: "react",
      voteScore: 6,
      deleted: false,
      commentCount: 2,
      commentIds: []
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: "6ni6ok3ym7mf1p33lnez",
      timestamp: 1468479767190,
      title: "Learn Redux in 10 minutes!",
      body: "Just kidding. It takes more than 10 minutes to learn technology.",
      author: "thingone",
      category: "redux",
      voteScore: -5,
      deleted: false,
      commentCount: 0,
      commentIds: ["8tu4bsun805n8un48ve89"]
    }
  },
  allIds: ["post1", "post2"]
};

function posts(state = initialPostsState, action) {
  //   const { day, recipe, meal } = action;

  switch (action.type) {
    case "UPDATE_POST_BODY": {
      const { body, id } = action;
      const currentPostState = state.byId[id];
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...currentPostState,
            body: body
          }
        }
      };

      break;
    }
    default:
      return state;
  }
}

export default combineReducers({
  comments,
  posts
});
