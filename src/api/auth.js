export function createHeaders(options) {
  const token = store.token;
  if (!token) {
    //TODO: create unique uuid.
    store.token = "UUID";
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
