// UUID authenticates user with api.
// TODO: user accounts and sessions and user data?
const uuidv1 = require("uuid/v1");

export function getBaseHeaders(options) {
  const token = store.token;

  if (!token) {
    const stored = JSON.parse(sessionStorage.getItem("udacity-p2"));

    if (!stored || !stored.token) {
      const token = uuidv1();
      store.token = token;
      sessionStorage.setItem("udacity-p2", JSON.stringify({ token }));
    } else {
      store.token = token;
    }
  }

  return Object.assign(
    {
      Authorization: store.token
    },
    options
  );
}

export const store = {
  token: null
};
