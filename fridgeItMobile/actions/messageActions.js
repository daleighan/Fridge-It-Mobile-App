import axios from 'axios';

// communicates with backend, sets the redux state. 

export const fetchMessages = (fridgeId) => {
  return function(dispatch) {
    axios.get('/api/allMessages/' + fridgeId)
      .then((response) => {
        dispatch({type: 'FETCH_MESSAGES_FULFILLED', payload: response.data});
      })
      .catch((err) => {
        dispatch({type: 'FETCH_MESSAGES_REJECTED', payload: err});
      });
  };
};
 
export const postMessages = (fridgeId, username, messages) => {
  return function(dispatch) {
    axios.post('/api/allMessages', {
      data: {
        messages: messages,
        like: [' '],
        fridgeId: fridgeId,
        user: username,
      }
    })
      .then((response) => {
        dispatch({type: 'POST_MESSAGES_FULFILLED', payload: response.data});
      })
      .catch((err) => {
        dispatch({type: 'POST_MESSAGES_REJECTED', payload: err});
      });
  };
};

export const deleteMessages = (messageId) => {
  return function(dispatch) {
    axios.delete('/api/allMessages/' + messageId)
      .then((response) => {
        dispatch({type: 'DELETE_MESSAGES_FULFILLED', payload: response.data});
      })
      .catch((err) => {
        dispatch({type: 'DELETE_MESSAGES_REJECTED', payload: err});
      });
  };
};

export const updateMessages = (msg) => {
  return function(dispatch) {
    axios.patch('/api/allMessages/' + msg.id, {
      like: msg.like,
      fridgeId: msg.fridgeId,
      user: msg.user,
      messageText: msg.messageText
    })
      .then((response) => {
        dispatch({type: 'UPDATE_MESSAGES_FULFILLED', payload: response.data[1]});
      })
      .catch((err) => {
        dispatch({type: 'UPDATE_MESSAGES_REJECTED', payload: err});
      });
  };
};
