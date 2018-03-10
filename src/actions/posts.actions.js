// TODO: clean up errors.
import { fetchPosts, fetchPost, updateVote, addPost } from "../api/api";

export const UPDATE_POST_BODY = "UPDATE_POST_BODY";
export const updatePostBody = payload => ({
  type: UPDATE_POST_BODY,
  id: payload.postId,
  body: payload.body
});

export const SELECT_POST = "SELECT_POST";
export const selectPost = post => ({
  type: SELECT_POST,
  post
});

export const REQUEST_POST_DETAIL = "REQUEST_POST_DETAIL";
export const requestPostDetail = postId => ({
  type: REQUEST_POST_DETAIL,
  postId
});

export const RECEIVE_POST_DETAIL = "RECEIVE_POST_DETAIL";
export const receivePostDetail = post => ({
  type: RECEIVE_POST_DETAIL,
  post
});

export const REQUEST_ALL_POSTS = "REQUEST_ALL_POSTS";
export const requestAllPosts = () => ({
  type: REQUEST_ALL_POSTS
});

export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";
export const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts
});

export const ADD_POST_SUCCESSFUL = "ADD_POST_SUCCESSFUL";
export const addPostSuccessful = post => ({
  type: ADD_POST_SUCCESSFUL,
  post
});

// todo: not yet implemented - could this be used to only update vote icons and vote numbers?
// for dev speed, when a vote happens, update the store with the new post data.
export const POST_ACTION_REQUEST = "POST_ACTION_REQUEST";
export const makePostAction = action => ({
  type: POST_ACTION_REQUEST,
  action
});

// todo: not yet implemented - could this be used to only update vote icons and vote numbers?
export const POST_ACTION_RESPONSE = "POST_ACTION_RESPONSE";
export const receivePostAction = action => ({
  type: POST_ACTION_REQUEST,
  action
});

export const ADD_COMMENT_TO_POST = "ADD_COMMENT_TO_POST";
export const addCommentToPost = payload => ({
  type: ADD_COMMENT_TO_POST,
  commentId: payload.commentId,
  postId: payload.postId
});

export function votePost(id, action) {
  return async function(dispatch) {
    //TODO: not yet implemented.
    // dispatch(makePostAction())
    try {
      const post = await updateVote("posts", id, action);
      dispatch(receivePostDetail(post));
    } catch (e) {
      // meh, if the api interaction fails, do nothing except log.
      console.error(`Could not vote on post ${id}, error: \n ${e}`);
    }
  };
}

export function fetchAllPosts() {
  return function(dispatch) {
    // dispatch synchronous action updating state for loading.
    dispatch(requestAllPosts());
    // at this point, connected components will re-render with spinners if appropriate.
    // now we can request posts from api.
    return fetchPosts()
      .then(r => {
        dispatch(receiveAllPosts(r));
      })
      .catch(e => {
        // the request was unsuccessful for whatever reason.
        // TODO: possibly retry or go to home?
      });
  };
}

export function fetchPostDetail(postId) {
  return function(dispatch) {
    dispatch(requestPostDetail(postId));
    return fetchPost(postId)
      .then(post => {
        dispatch(receivePostDetail(post));
        return post;
      })
      .catch(e => {
        // TODO: handle catcvh.
      });
  };
}

export function createPost(post) {
  return function(dispatch) {
    return addPost(post)
      .then(post => {
        dispatch(addPostSuccessful(post));
        return post;
      })
      .catch(error => {
        throw error;
      });
  };
}
