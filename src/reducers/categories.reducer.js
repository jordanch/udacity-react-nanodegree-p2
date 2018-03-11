import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from "../actions/categories.actions";

const initialCategoryState = {
  byName: {},
  allNames: [],
  isFetchingCategories: false
};

export default function categories(state = initialCategoryState, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetchingCategories: true
      });

    case RECEIVE_CATEGORIES: {
      const { categories } = action;

      return Object.assign({}, state, {
        isFetchingCategories: false,
        byName: categories.reduce((acc, curr) => {
          acc[curr.name] = curr;
          return acc;
        }, {}),
        allNames: categories.map(cat => cat.name)
      });
    }

    default:
      return state;
  }
}
