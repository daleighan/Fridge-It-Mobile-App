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

import ItemList from './itemListView.js';

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
    }, 700);
  }

  handleSwitch = () => {
    const that = this;
    this.props.fridgeActions.getFridge(this.state.otherUsernameText);
    setTimeout(() => {
      AsyncStorage.getItem('fid').then((fId) => {
        that.props.itemActions.getItems(fId);
      })
    }, 700);
  }

  render = () => {
    let { fridge, fridgeActions, itemActions } = this.props;
    return (
      <View>
        <View>
          <Text>Find Another User's Fridge by E-mail</Text>
          <TextInput onChangeText={(text) => this.setState({ otherUsernameText: text })} />
          <Text style={styles.btn} onPress={this.handleSwitch}>Submit</Text>
          <View style={styles.twoWide}>
            <Text style={styles.btn} onPress={this.getYourFridge}>Back To Your Fridge</Text>
            <Link to="/addition">
              <Text style={styles.btn}>Add an Item</Text>
            </Link>
          </View>
        </View>
        <View>
          <Text>{fridge.name}'s Fridge</Text>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./frozen.png')}
            >
            </Image>
            <Text>Frozen</Text>
            <ItemList fridge={fridge} actions={itemActions} type="frozen" items={this.filterItems("frozen")} /> 
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./protein.png')}
            >
            </Image>
            <Text>Protein</Text>
            <ItemList fridge={fridge} actions={itemActions} type="protein" items={this.filterItems("protein")} />
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./grains.png')}
            >
            </Image>
            <Text>Grains</Text>
            <ItemList fridge={fridge} actions={itemActions} type="grains" items={this.filterItems("grains")} />
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./dairy.png')}
            >
            </Image>
            <Text>Dairy</Text>
            <ItemList fridge={fridge} actions={itemActions} type="dairy" items={this.filterItems("dairy")} />
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./produce.png')}
            >
            </Image>
            <Text>Produce</Text>
            <ItemList fridge={fridge} actions={itemActions} type="produce" items={this.filterItems("produce")} />
          </View>
          <View>
            <Image
              style={{width: 55, height: 55}}
              source={require('./misc.png')}
            >
            </Image>
            <Text>Misc</Text>
            <ItemList fridge={fridge} actions={itemActions} type="misc" items={this.filterItems("misc")} />
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

const styles = StyleSheet.create({
  btn: {
    fontSize: 20,
    height: 50,
    textAlign: 'center',
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 2,
    padding: 13,
    margin: 3,
    backgroundColor: '#3B86D2',
    fontWeight: 'bold',
    color: 'white'
  },
  twoWide: {
    width: 360,
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    marginRight: 100
  }
});

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