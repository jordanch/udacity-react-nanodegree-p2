import { getCategories } from "../api/api";

export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES";
export const requestCategories = payload => ({
  type: REQUEST_CATEGORIES
});

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const receiveCategories = payload => ({
  type: RECEIVE_CATEGORIES,
  categories: payload.categories
});

export function fetchAllCategories() {
  return function(dispatch, getState) {
    dispatch(requestCategories());
    return getCategories()
      .then(categories => {
        dispatch(receiveCategories({ categories }));
      })
      .catch(e => {
        // TODO: possibly retry or go to home?
      });
  };
}
