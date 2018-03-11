import {
  fetchPostComments as getPostComments,
  updateVote,
  addComment,
  updateComment as putComment
} from "../api/api";

import { addCommentToPost } from "../actions/posts.actions";

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

export const UPDATE_COMMENT_SUCCESSFUL = "UPDATE_COMMENT_SUCCESSFUL";
export const updateCommentSuccessful = comment => ({
  type: UPDATE_COMMENT_SUCCESSFUL,
  comment
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
    try {
      const comment = await updateVote("comments", id, action);
      dispatch(receiveComment(comment));
    } catch (e) {
      // meh, if the api interaction fails, do nothing except log.
      console.error(`Could not vote on comment ${id}, error: \n ${e}`);
    }
  };
}

export function createComment(comment) {
  return function(dispatch) {
    return addComment(comment)
      .then(comment => {
        dispatch(receiveComment(comment));
        dispatch(
          addCommentToPost({ commentId: comment.id, postId: comment.parentId })
        );
      })
      .catch(e => {
        console.log(e);
        throw e;
      });
  };
}

export function updateComment(comment) {
  return function(dispatch) {
    return putComment(comment)
      .then(comment => {
        dispatch(updateCommentSuccessful(comment));
        return comment;
      })
      .catch(error => {
        throw error;
      });
  };
}
