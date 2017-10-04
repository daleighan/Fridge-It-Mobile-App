import { combinedReducers, createStore } from 'redux';

const initialState = {
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  deleting: false,
  deleted: false,
  updating: false,
  updated: false,
  messages: [],
  error: null,

}

//reducers create a new state depending on the actions

const messageReducer = (state=initialState, action) => {
  switch(action.type) {

    case "FETCH_MESSAGES_REJECTED": {
      return Object.assign({}, state, { 
        fetching: false, 
        error: action.payload
      })
    }

    case "FETCH_MESSAGES_FULFILLED": {
      return Object.assign({}, state, { 
        fetching: false,
        fetched: true,
        messages: action.payload,
      })
    }

    case "POST_MESSAGES_REJECTED": {
      return Object.assign({}, state, {
        posting: false, 
        error: action.payload
      })
    }

    case "POST_MESSAGES_FULFILLED": {
      return Object.assign({}, state, {
        posting: false,
        posted: true,
        messages: state.messages.concat(action.payload),
      })
    }

    case "DELETE_MESSAGES_REJECTED": {
      return Object.assign({}, state, {
        deleting: false, 
        error: action.payload
      })
    }

    case "DELETE_MESSAGES_FULFILLED": {
      console.log('before filter', state.messages);
      return Object.assign({}, state, {
        deleting: false,
        deleted: true,
        messages: state.messages.filter(message => {
          return message.id !== Number(action.payload.id) ? message : null;
        }), //make sure this works
      })
    }

    case "UPDATE_MESSAGES_REJECTED": {
      return Object.assign({}, state, {
        updating: false,
        error: action.payload
      })
    }

    case "UPDATE_MESSAGES_FULFILLED": {
      return Object.assign({}, state, {
        updating: false,
        updated: true,
        messages: state.messages.map(message => { 
          return message.id === action.payload[0].id ? message = action.payload[0] : message
        }),
      })
    }
  }
  
  return state;
}

export default messageReducer;