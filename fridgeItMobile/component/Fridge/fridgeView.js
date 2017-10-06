import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ItemListView from './itemListView.js';
import ItemAddition from './itemAddition.js';

import * as fridgeActions from '../../actions/fridgeActions.js';
import * as itemActions from '../../actions/itemActions.js';

class Fridge extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    let that = this;
    AsyncStorage.getItem('name').then((name) => {
      that.props.fridgeActions.getFridge(name);
    }).then(() => {
      AsyncStorage.getItem('fid').then((fId) => {
        console.log(fId);
        that.props.itemActions.getItems(fId);
      }).catch((err) => console.log(err));
    });
  };

  // componentDidMount() {
  //   this.props.fridgeActions.getFridge(localStorage.getItem('visitorId') || localStorage.getItem('name'));
  //   let state = this;
  //   setTimeout(() => {
  //     state.props.itemActions.getItems(localStorage.getItem('fId'));
  //   }, 500);
  // };

  filterItems = (type) => {
    return this.props.items.filter((item) => {
      if (item.type === type) {
        return item; 
      }
    })
  };

  render = () => {
    return (
      <Text>Fridge</Text>
    )
  }
}


const fridgeState = (store) => {
  return {
    username: store.auth.username,
    fridge: store.fridge.fridge,
    items: store.items.items,
    posted: store.fridge.posted,
    fetched: store.fridge.fetched
  }
};

const fridgeDispatch = (dispatch) => {
  return {
    fridgeActions: bindActionCreators(fridgeActions, dispatch),
    itemActions: bindActionCreators(itemActions, dispatch)
  }
};

export default connect(fridgeState, fridgeDispatch)(Fridge); 