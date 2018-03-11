import {
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  RECEIVE_POST_DETAIL,
  ADD_POST_SUCCESSFUL,
  ADD_COMMENT_TO_POST,
  UPDATE_POST_SUCCESSFUL,
  REMOVE_COMMENT_FROM_POST,
  DELETE_POST_SUCCESS
} from "../actions/posts.actions";

const initialPostsState = {
  byId: {},
  allIds: [],
  isFetchingPosts: false,
  hasFecthedAllPosts: false
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
        { isFetchingPosts: false, hasFecthedAllPosts: true },
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
        allIds: [...state.allIds, post.id]
      });

    case ADD_POST_SUCCESSFUL:
      const { post: newPost } = action;
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [newPost.id]: Object.assign(newPost, { commentIds: [] })
        },
        allIds: [...state.allIds, newPost.id]
      });

    case ADD_COMMENT_TO_POST:
      const { commentId, postId } = action;
      const targetPost = state.byId[postId];

      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [targetPost.id]: Object.assign(targetPost, {
            commentIds: [...targetPost.commentIds, commentId],
            commentCount: targetPost.commentCount + 1
          })
        }
      });

    case UPDATE_POST_SUCCESSFUL:
      const currentPost = state.byId[action.post.id];
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [action.post.id]: Object.assign(
            {},
            { ...currentPost, ...action.post }
          )
        }
      });

    case REMOVE_COMMENT_FROM_POST:
      const { postId: currentPostId, commentId: currentCommentId } = action;
      const workingPost = Object.assign({}, state.byId[currentPostId]);
      workingPost.commentIds.splice(
        workingPost.commentIds.indexOf(commentId) - 1,
        1
      );
      workingPost.commentCount--;

      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [workingPost.id]: workingPost
        }
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

    case DELETE_POST_SUCCESS:
      const { post: deletedPost } = action;
      const workingPosts = Object.assign({}, state.byId);
      delete workingPosts[deletedPost.id];
      const workingIds = [...state.allIds];
      workingIds.splice(workingIds.indexOf(deletedPost.id) - 1, 1);

      return Object.assign({}, state, {
        byId: workingPosts,
        allIds: workingIds
      });

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
