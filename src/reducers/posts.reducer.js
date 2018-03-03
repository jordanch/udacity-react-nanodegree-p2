import {
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  RECEIVE_POST_DETAIL
} from "../actions/posts.actions";

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

    case RECEIVE_POST_DETAIL:
      const { post } = action;
      const previousComments =
        state.byId[post.id] && state.byId[post.id].commentIds
          ? state.byId[post.id].commentIds
          : [];
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [post.id]: Object.assign({}, post, {
            commentIds: previousComments
          })
        },
        // TODO: turn this into a Set to ensure unique ids.
        allIds: [...state.allIds, post.id]
      });

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
    acc.byId[curr.id] = Object.assign({}, curr, {
      commentIds: []
    });
    acc.allIds.push(curr.id);

    return acc;
  }, {});
}
