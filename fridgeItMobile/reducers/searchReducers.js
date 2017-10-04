const initialState = {
  recipes: [],
  fetching: false,
  fetched: false,
  onRecipeListPage: false,
  error: null
}

// Catches actions for fetching, fetched, and item(deletion/addition)
const searchReducer = (state=initialState, action) => {
  switch(action.type) {
    
    case "FETCH_RECIPES": {
      return Object.assign({}, state, {fetching: true});
    }

    case "FETCH_RECIPES_REJECTED": {
      return Object.assign({}, state, {fetching: false, error: action.payload});
    }

    case "FETCH_RECIPES_FULFILLED": {
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        recipes: action.payload,
      });
    }
    case "NEW_ITEM_POSTED": {
      return Object.assign({}, state, {
        fetched: false,
      });
    }
    default: {
      return state;
    }
  };
};

export default searchReducer;