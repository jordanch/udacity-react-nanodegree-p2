// UUID authenticates user with api.
// TODO: user accounts and sessions and user data?
const uuidv1 = require("uuid/v1");

export function getBaseHeaders(options) {
  const token = store.token;
  if (!token) {
    store.token = uuidv1();
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
