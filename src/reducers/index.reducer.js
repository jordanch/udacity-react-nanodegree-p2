// TODO: change index reducer to index.js, then split out reducers from root (index) reducer.

import { combineReducers } from "redux";

function food(state = {}, action) {
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
      commentCount: 2
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
      commentCount: 0
    }
  },
  allIds: ["post1", "post2"],
  previousActivePostId: "8xf0y6ziyjabvozdd253nd"
  //   comments: {
  //     byId: {
  //       comment1: {
  //         id: "comment1",
  //         author: "user2",
  //         comment: "....."
  //       },
  //       comment2: {
  //         id: "comment2",
  //         author: "user3",
  //         comment: "....."
  //       },
  //       comment3: {
  //         id: "comment3",
  //         author: "user3",
  //         comment: "....."
  //       },
  //       comment4: {
  //         id: "comment4",
  //         author: "user1",
  //         comment: "....."
  //       },
  //       comment5: {
  //         id: "comment5",
  //         author: "user3",
  //         comment: "....."
  //       }
  //     },
  //     allIds: ["comment1", "comment2", "comment3", "commment4", "comment5"]
  //   }
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
  food,
  posts
});
