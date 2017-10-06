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
      otherUsernameText: '',
      toggle: true
    }
  }


  componentWillReceiveProps = () => {
    let that = this;
    AsyncStorage.getItem('name').then((name) => {
      console.log('name', name)
    })

    // setTimeout(() => {
    //   AsyncStorage.getItem('fid').then((fId) => {
    //     that.props.itemActions.getItems(fId);
    //   })
    // }, 200);
  };


  filterItems = (type) => {
    return this.props.items.filter((item) => {
      if (item.type === type) {
        return item; 
      }
    })
  };

  getYourFridge = () => {
    const that = this;
    AsyncStorage.getItem('name').then((name) => {
      this.props.fridgeActions.getFridge(name);
      this.setState({'currentUser': name});
    })
    setTimeout(() => {
      AsyncStorage.getItem('fid').then((fId) => {
        that.props.itemActions.getItems(fId);
      })
    }, 200);
  }

  handleSwitch = () => {
    const that = this;
    this.props.fridgeActions.getFridge(this.state.otherUsernameText);
    setTimeout(() => {
      AsyncStorage.getItem('fid').then((fId) => {
        that.props.itemActions.getItems(fId);
      })
    }, 200);
  }

  render = () => {
    let { fridge, fridgeActions, itemActions } = this.props;
    return (
      <View>
        <View>
          <Text>Find Another User's Fridge</Text>
          <TextInput onChangeText={(text) => this.setState({ otherUsernameText: text })} />
          <Button title="Submit" onPress={this.handleSwitch} />
          <Button title="Your Fridge" onPress={this.getYourFridge} />
        </View>
        <View>
          <ItemAddition />
        </View>
        <View>
          {types.map((type) => {
            let filteredItems = this.filterItems(type.name);
            return (
              <Text>{type.name}</Text>
            )
          })}
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

const types = [
{
  name: 'produce', 
  position: 'top center',
  display: 'Produce'
}, 
{
  name: 'dairy', 
  position: 'top left',
  display: 'Dairy'
},
{
  name: 'protein',
  position: 'left center',
  display: 'Protein'
},
{
  name: 'grains',
  position: 'top right',
  display: 'Grains'
}, 
{
  name: 'frozen',
  position: 'right center',
  display: 'Frozen'
}, 
{
  name: 'misc',
  position: 'top left',
  display: 'Misc'
}
]; 