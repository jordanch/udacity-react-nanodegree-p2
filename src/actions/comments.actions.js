import { fetchPostComments as getPostComments, updateVote } from "../api/api";

export const REQUEST_POST_COMMENTS = "REQUEST_POST_COMMENTS";
export const requestPostComments = payload => ({
  type: REQUEST_POST_COMMENTS
});

export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";
export const receivePostComments = payload => ({
  type: RECEIVE_POST_COMMENTS,
  comments: payload.comments,
  posts: payload.posts
});

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const receiveComment = payload => ({
  type: RECEIVE_COMMENT,
  comment: payload
});

export function fetchPostComments(id) {
  return function(dispatch, getState) {
    dispatch(requestPostComments());

    return getPostComments(id)
      .then(comments => {
        dispatch(receivePostComments({ comments, posts: getState().posts }));
      })
      .catch(e => {
        // TODO: possibly retry or go to home?
      });
  };
}

export function voteComment(id, action) {
  return async function(dispatch) {
    //todo: not yet implemented.
    // dispatch(makeCommentAction())
    try {
      const comment = await updateVote("comments", id, action);
      dispatch(receiveComment(comment));
    } catch (e) {
      // meh, if the api interaction fails, do nothing except log.
      console.error(`Could not vote on comment ${id}, error: \n ${e}`);
    }
  };
}
