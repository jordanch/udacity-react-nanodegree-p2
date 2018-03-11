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

export function addPost(post) {
  return fetch(`${getHost()}/posts`, {
    method: "POST",
    headers: new Headers(
      getBaseHeaders({ "Content-Type": "application/json" })
    ),
    body: JSON.stringify(post)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server rerror - /posts POST");
      } else {
        return response.json();
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export function updatePost(post) {
  return fetch(`${getHost()}/posts/${post.id}`, {
    method: "PUT",
    headers: new Headers(
      getBaseHeaders({ "Content-Type": "application/json" })
    ),
    body: JSON.stringify(post)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server rerror - /posts PUT");
      } else {
        return response.json();
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export function updateComment(post) {
  return fetch(`${getHost()}/comments/${post.id}`, {
    method: "PUT",
    headers: new Headers(
      getBaseHeaders({ "Content-Type": "application/json" })
    ),
    body: JSON.stringify(post)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server rerror - /posts PUT");
      } else {
        return response.json();
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export function addComment(comment) {
  return fetch(`${getHost()}/comments`, {
    method: "POST",
    headers: new Headers(
      getBaseHeaders({ "Content-Type": "application/json" })
    ),
    body: JSON.stringify(comment)
  }).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Server error - /comment POST");
      }
    },
    error => {
      console.error(error);
      throw error;
    }
  );
}
