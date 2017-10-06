import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage,
  TextInput
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
    this.state = {
      otherUsernameText: ''
    }
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


  filterItems = (type) => {
    return this.props.items.filter((item) => {
      if (item.type === type) {
        return item; 
      }
    })
  };

  handleSwitch = () => {
    this.props.fridgeActions.getFridge(this.state.otherUsernameText)
  }

  render = () => {
    let { fridge, fridgeActions, itemActions } = this.props;
    return (
      <View>
        <View>
          <Text>Find Another User's Fridge</Text>
          <TextInput onChangeText={(text) => this.setState({ otherUsernameText: text })} />
          <Button title="Submit" onPress={this.handleSwitch} />
        </View>
      </View>
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