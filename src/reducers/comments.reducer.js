import {
  fetchPostComments,
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS,
  RECEIVE_COMMENT
} from "../actions/comments.actions";

const initialPostsState = {
  byId: {},
  allIds: [],
  isFetchingComments: false
};

export default function comments(state = initialPostsState, action) {
  switch (action.type) {
    // toggle spinners and such.
    case REQUEST_POST_COMMENTS:
      return Object.assign({}, state, {
        isFetchingComments: true
      });

    case RECEIVE_POST_COMMENTS:
      // link comments to posts.
      action.comments.forEach(linkCommentToPost.bind(null, action.posts.byId));
      return Object.assign(
        {},
        state,
        { isFetchingComments: false },
        orchestratePostCommentsResponse(action.comments)
      );

    case RECEIVE_COMMENT:
      // merge specific comment object into state, does it update only the specific comment dom>?
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      });

    default:
      return state;
  }
}

/**
 * We need to do a few things here.
 * Update store state with comment data.
 * iterate over the comment array, looking for existing posts that match the parentId prop
 * on the comment object. extend the in-store post object with an array of
 * all comments that are linked to the post.
 * @param {array} comments
 */
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
  // get commentId
  // get parentId
  const { id, parentId } = comment;
  try {
    posts[parentId].commentIds.push(id);
  } catch (e) {
    console.error("Could not find post by id.");
  }
}
