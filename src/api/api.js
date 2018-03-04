import { getHost } from "./environment";
import { getBaseHeaders } from "./auth";

export function fetchPosts() {
  return fetch(`${getHost()}/posts`, {
    method: "GET",
    headers: new Headers(getBaseHeaders())
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
    headers: new Headers(getBaseHeaders())
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
    headers: new Headers(getBaseHeaders())
  }).then(
    response => response.json(),
    error => {
      console.error(error);
      throw new Error(error);
    }
  );
}

export function updateVote(entityType, id, vote) {
  // TODO: alternative functional way, consider container data type when extending scope.
  const voteAction = { option: vote === "up" ? "upVote" : "downVote" };

  return fetch(`${getHost()}/${entityType}/${id}`, {
    method: "POST",
    headers: new Headers(
      getBaseHeaders({
        "Content-Type": "application/json"
      })
    ),
    body: JSON.stringify(voteAction)
  }).then(
    response => response.json(),
    error => {
      console.error(error);
      throw new Error(error);
    }
  );
}

export function getCategories() {
  return fetch(`${getHost()}/categories`, {
    method: "GET",
    headers: new Headers(getBaseHeaders())
  }).then(
    response => response.json().then(jso => jso.categories),
    error => {
      console.error(error);
      throw new Error(error);
    }
  );
}
