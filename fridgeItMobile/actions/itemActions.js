import axios from 'axios';

//functions to get items and add items on front end 
//uses reducers as part of promises to change state

export function getItems(fridgeId) {
  return function(dispatch) {
    axios.get('https://immense-gorge-29906.herokuapp.com/api/items/' + fridgeId)
      .then(({ data }) => {
        dispatch({type: 'FETCH_ITEMS_FULFILLED', payload: data});
      })
      .catch(err => { 
        dispatch({type: 'FETCH_ITEMS_REJECTED', payload: err});
      });
  };
};

export function addItem(item, id) {
  return function(dispatch) {
    axios.post('https://immense-gorge-29906.herokuapp.com/api/items', {
      name: item.name,
      quantity: item.quantity,
      type: item.type,
      user: item.user,
      fridgeId: id,
      expiry: item.expiry
    })
      .then(({ data }) => {
        alert('Item Added!');
        dispatch({type: 'POST_ITEM_FULFILLED', payload: data});
        dispatch({type: 'NEW_ITEM_POSTED'});
      })
      .catch(err => { 
        dispatch({type: 'POST_ITEM_REJECTED', payload: err});
      });
  };
};

export function updateItem(item, id) {
  return function(dispatch) {
    axios.patch('https://immense-gorge-29906.herokuapp.com/api/items/' + id, {
      name: item.name,
      quantity: item.quantity, 
      type: item.type,
      user: item.user,
      fridgeId: id
    }) 
    .then((response) => {
      dispatch({type: 'UPDATE_ITEM_FULFILLED', payload: response.data[1]});
    })
    .catch(err => {
      dispatch({type: 'UPDATE_ITEM_REJECTED', payload: err});
    })
  }
}

export function deleteItem(id) {
  return function(dispatch) {
    axios.delete('https://immense-gorge-29906.herokuapp.com/api/items/' + id)
      .then((response) => {
        dispatch({type: 'DELETE_ITEM_FULFILLED', payload: response.data});
        dispatch({type: 'NEW_ITEM_POSTED'});
      })
      .catch(err => {
        dispatch({type: 'DELETE_ITEM_REJECTED', payload: err});
      });
  };
};
