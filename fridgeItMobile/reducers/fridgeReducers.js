const initialState = {
  fridge: {},
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  error: null
}

//reducer to change state for each action

const fridgeReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'FETCH_FRIDGE_PENDING': {
      return Object.assign({}, state, {fetching: true});
    }
    case 'FETCH_FRIDGE_REJECTED': {
      return Object.assign({}, state, {fetching: false, error: action.payload});
    }
    case 'FETCH_FRIDGE_FULFILLED': {
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        fridge: Object.assign(action.payload)
      })
    }

    case 'POST_FRIDGE_PENDING': {
      return Object.assign({}, state, {posting: true});
    }

    case 'POST_FRIDGE_REJECTED': {
      return Object.assign({}, state, {posting: false, error: action.payload});
    }

    case 'POST_FRIDGE_FULFILLED': {
      return Object.assign({}, state, {
        posting: false,
        posted: true,
        fridge: action.payload
      })
    }
    
    default: {
      return state;
    }
  }
}

export default fridgeReducer; 