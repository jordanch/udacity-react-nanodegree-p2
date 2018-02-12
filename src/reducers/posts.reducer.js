import { REQUEST_ALL_POSTS, RECEIVE_ALL_POSTS } from "../actions/posts.actions";
// const initialPostsState = {
//   byId: {
//     "8xf0y6ziyjabvozdd253nd": {
//       id: "8xf0y6ziyjabvozdd253nd",
//       timestamp: 1467166872634,
//       title: "Udacity is the best place to learn React",
//       body: "Everyone says so after all.",
//       author: "thingtwo",
//       category: "react",
//       voteScore: 6,
//       deleted: false,
//       commentCount: 2,
//       commentIds: []
//     },
//     "6ni6ok3ym7mf1p33lnez": {
//       id: "6ni6ok3ym7mf1p33lnez",
//       timestamp: 1468479767190,
//       title: "Learn Redux in 10 minutes!",
//       body: "Just kidding. It takes more than 10 minutes to learn technology.",
//       author: "thingone",
//       category: "redux",
//       voteScore: -5,
//       deleted: false,
//       commentCount: 0,
//       commentIds: ["8tu4bsun805n8un48ve89"]
//     }
//   },
//   allIds: ["post1", "post2"]
// };

const initialPostsState = {
  byId: {},
  allIds: [],
  isFetchingPosts: false
};

export default function posts(state = initialPostsState, action) {
  switch (action.type) {
    // toggle spinners and such.
    case REQUEST_ALL_POSTS:
      return Object.assign({}, state, {
        isFetchingPosts: true
      });
    case RECEIVE_ALL_POSTS:
      return Object.assign(
        {},
        state,
        { isFetchingPosts: false },
        orchestratePostResponse(action.posts)
      );
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

function orchestratePostResponse(posts) {
  return posts.reduce((acc, curr) => {
    if (!acc.byId) {
      acc.byId = {};
    }
    if (!acc.allIds) {
      acc.allIds = [];
    }
    acc.byId[curr.id] = curr;
    acc.allIds.push(curr.id);

    return acc;
  }, {});
}
