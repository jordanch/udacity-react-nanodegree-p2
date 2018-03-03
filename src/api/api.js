import { getHost } from "./environment";
import { createHeaders } from "./auth";

export function fetchPosts() {
  return fetch(`${getHost()}/posts`, {
    method: "GET",
    headers: new Headers(createHeaders())
  }).then(
    // parse into json before returning.
    response => response.json(),
    error => {
      // i.e. Error instance { message: string, stack: string}
      console.error(error);
      throw new Error(error);
    }
  );
}

export function fetchPost(id) {
  return fetch(`${getHost()}/posts/${id}`, {
    method: "GET",
    headers: new Headers(createHeaders())
  }).then(
    // parse into json before returning.
    response => response.json(),
    error => {
      // i.e. Error instance { message: string, stack: string}
      console.error(error);
      throw new Error(error);
    }
  );
}

export function fetchPostComments(postId) {
  return fetch(`${getHost()}/posts/${postId}/comments`, {
    method: "GET",
    headers: new Headers(createHeaders())
  }).then(
    response => response.json(),
    error => {
      console.error(error);
      throw new Error(error);
    }
  );
}
