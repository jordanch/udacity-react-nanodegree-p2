import { fetchPosts } from "../api/api";

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
export const requestPostDetail = post => ({
  type: REQUEST_POST_DETAIL,
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

export function fetchAllPosts() {
  return function(dispatch) {
    // dispatch synchronous action updating state for loading.
    dispatch(requestAllPosts());
    // at this point, connected components will re-render with spinners if appropriate.
    // now we can request posts from api.
    return fetchPosts().then(r => {
      if (r.error) {
      }
      dispatch(receiveAllPosts(r));
    });
  };
}
