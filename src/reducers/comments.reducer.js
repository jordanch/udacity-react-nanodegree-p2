import {
  fetchPostComments,
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS,
  RECEIVE_COMMENT,
  UPDATE_COMMENT_SUCCESSFUL
} from "../actions/comments.actions";

const initialPostsState = {
  byId: {},
  allIds: [],
  isFetchingComments: false
};

export default function comments(state = initialPostsState, action) {
  switch (action.type) {
    case REQUEST_POST_COMMENTS:
      return Object.assign({}, state, {
        isFetchingComments: true
      });

    case RECEIVE_POST_COMMENTS:
      action.comments.forEach(linkCommentToPost.bind(null, action.posts.byId));
      return Object.assign(
        {},
        state,
        { isFetchingComments: false },
        orchestratePostCommentsResponse(action.comments)
      );

    case RECEIVE_COMMENT:
    case UPDATE_COMMENT_SUCCESSFUL:
      const allIds = [...state.allIds];
      if (!allIds.includes(action.comment.id)) {
        allIds.push(action.comment.id);
      }

      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        },
        allIds
      });

    default:
      return state;
  }
}

function orchestratePostCommentsResponse(comments) {
  return comments.reduce((acc, curr) => {
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

function linkCommentToPost(posts, comment) {
  const { id, parentId } = comment;
  try {
    posts[parentId].commentIds.push(id);
  } catch (e) {
    console.error("Could not find post by id.");
  }
}
