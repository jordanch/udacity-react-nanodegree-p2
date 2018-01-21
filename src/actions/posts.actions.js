const UPDATE_POST_BODY = "UPDATE_POST_BODY";

export const updatePostBody = payload => ({
  type: UPDATE_POST_BODY,
  id: payload.postId,
  body: payload.body
});
