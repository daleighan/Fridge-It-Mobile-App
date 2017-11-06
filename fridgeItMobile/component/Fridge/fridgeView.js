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
          <Text style={{ fontSize: 20, margin:7, textAlign: 'center' }}>See Another User's Fridge by E-mail!</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ otherUsernameText: text })} />
          <View style={styles.buttons}>
            <Text style={styles.btn} onPress={this.handleSwitch}>Submit</Text>
            <View style={styles.twoWide}>
              <Text style={[styles.btn, { width: 165 } ]} onPress={this.getYourFridge}>Back To Your Fridge</Text>
              <Link to="/addition">
                <Text style={[styles.btn, { width: 165, paddingTop: 5 } ]}>Add an Item to your Fridge</Text>
              </Link>
            </View>
          </View>
        </View>
          <Text style={styles.name}>{fridge.name}'s Fridge</Text>
          <View style={[styles.category, {backgroundColor: '#FC7E7E'}]}>
            <View style={styles.imageContain}>
              <Text style={styles.type}>Protein</Text>
              <Image
                style={styles.img}
                source={require('./protein.png')}
              >
              </Image>
            </View>
            <ItemList fridge={fridge} actions={itemActions} type="protein" items={this.filterItems("protein")} />
          </View>
          <View style={[styles.category, {backgroundColor: '#F2CC7B'}]}>
            <View style={styles.imageContain}>
              <Text style={styles.type}>Grains</Text>
              <Image
                style={styles.img}
                source={require('./grains.png')}
              >
              </Image>
            </View>
            <ItemList fridge={fridge} actions={itemActions} type="grains" items={this.filterItems("grains")} />
          </View>
          <View style={[styles.category, {backgroundColor: '#A5C6EF'}]}>
            <View style={styles.imageContain}>
              <Text style={styles.type}>Dairy</Text>
              <Image
                style={styles.img}
                source={require('./dairy.png')}
              >
              </Image>
            </View>
            <ItemList fridge={fridge} actions={itemActions} type="dairy" items={this.filterItems("dairy")} />
          </View>
          <View style={[styles.category, {backgroundColor: '#A2D8C0'}]}>
            <View style={styles.imageContain}>
              <Text style={styles.type}>Produce</Text>
              <Image
                style={styles.img}
                source={require('./produce.png')}
              >
              </Image>
            </View>
            <ItemList fridge={fridge} actions={itemActions} type="produce" items={this.filterItems("produce")} />
          </View>

          <View style={[styles.category, {backgroundColor: '#bad5dd'}]}>
            <View style={styles.imageContain}>
              <Text style={styles.type}>Frozen</Text>
              <Image
                style={styles.img}
                source={require('./frozen.png')}
              >
              </Image>
            </View>
            <ItemList fridge={fridge} actions={itemActions} type="frozen" items={this.filterItems("frozen")} />
          </View>
          <View>
          <View style={[styles.category, {backgroundColor: '#e5a5c2'}]}>
            <View style={styles.imageContain}>
              <Text style={styles.type}>Misc</Text>
              <Image
                style={styles.img}
                source={require('./misc.png')}
              >
              </Image>
            </View>
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
  buttons: {
    marginLeft: 12,
    marginRight: 12
  },
  textInput: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 30,
    marginRight:30,
    textAlign: 'center'
  },
  btn: {
    margin: 1,
    fontSize: 20,
    height: 50,
    textAlign: 'center',
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 2,
    padding: 13,
    marginTop: 3,
    backgroundColor: '#3B86D2',
    fontWeight: 'bold',
    color: 'white'
  },
  twoWide: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  name: {
    padding: 15,
    fontSize: 26,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    marginBottom: 20
  },
  category: {
    flex: 1,
    marginTop: 9,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    padding: 7,
    borderRadius: 7,
  },
  imageContain: {
    paddingTop:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    marginBottom: 10
  },
  type: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 22
  },
  img: {
    width: 55, 
    height: 55,
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
