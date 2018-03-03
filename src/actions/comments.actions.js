import { fetchPostComments as getPostComments } from "../api/api";

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
