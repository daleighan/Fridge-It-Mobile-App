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
import { Link } from 'react-router-native';
// import SvgUri from 'react-native-svg-uri';
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
    console.log(this.props);
    return (
      <View>
        <View>
          <Text>Find Another User's Fridge</Text>
          <TextInput onChangeText={(text) => this.setState({ otherUsernameText: text })} />
          <Button title="Submit" onPress={this.handleSwitch} />
          <Button title="Back To Your Fridge" onPress={this.getYourFridge} />
        </View>
        <View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./frozen.png')}
            >
            <Text>Frozen</Text>
            </Image>
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./protein.png')}
            >
            <Text>Protein</Text>
            </Image>
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./grains.png')}
            >
            <Text>Grains</Text>
            </Image>
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./dairy.png')}
            >
            <Text>Dairy</Text>
            </Image>
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./produce.png')}
            >
            <Text>Produce</Text>
            </Image>
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./misc.png')}
            >
            <Text>Misc</Text>
            </Image>
          </View>
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
  id: 1,
  name: 'produce', 
  img: 'produce.png'
}, 
{
  id: 2,
  name: 'dairy', 
  img: 'dairy.png'
},
{ id: 3,
  name: 'protein',
  img: 'protein.png'
},
{ 
  id: 4,
  name: 'grains',
  img: 'grains.png'
}, 
{
  id: 5,
  name: 'frozen',
  img: 'frozen.png'
}, 
{ id: 6,
  name: 'misc',
  img: 'misc.png'
}
]; 