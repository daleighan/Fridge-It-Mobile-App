import axios from 'axios';
import { AsyncStorage } from 'react-native'

//functions to get fridges and add fridges on front end 
//uses reducers as part of promises to change state

export function getFridge(name) {
  return function(dispatch) {
    axios.get('https://immense-gorge-29906.herokuapp.com/api/fridge/' + name)
      .then((data) => {
        AsyncStorage.setItem('fId', data.data[0].id).then((item) => {
        }).catch((err) => console.log(err));
        dispatch({type: 'FETCH_FRIDGE_FULFILLED', payload: data.data[0]});
      })
      .catch(err => {
        dispatch({type: 'FETCH_FRIDGE_REJECTED', payload: err});
      });
  };
};

export function addFridge(fridge) {
  return function(dispatch) {
    axios.post('https://immense-gorge-29906.herokuapp.com/api/fridge', {
      users: fridge.users,
      name: fridge.name
    })
      .then(({ data }) => {
        dispatch({type: 'POST_FRIDGE_FULFILLED', payload: data})
      })
      .catch(err => {
        dispatch({type: 'POST_FRIDGE_REJECTED', payload: err})
      });
  };
};

