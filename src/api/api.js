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
      // what does .debug do differently from .info?
      console.debug(error);
      return error;
    }
  );
}
