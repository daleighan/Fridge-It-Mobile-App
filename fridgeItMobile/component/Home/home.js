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
import Axios from 'axios';

// import Messages from '../Message/messagesListView.js';
// import Search from '../Search/searchListView.js';
import Fridge from '../Fridge/fridgeView.js';
import * as fridgeActions from '../../actions/fridgeActions.js';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		Axios.get('https://immense-gorge-29906.herokuapp.com/api/fridge/daleighan@gmail.com').then((data) => console.log(data.data[0]));
		let that = this;
		AsyncStorage.getItem('name').then((name) => {
			this.props.actions.getFridge(name);
		}).catch((err) => console.log(err));
	}

	render = () => {
		return null;
	}
}

const homeState = (store) => {
  return {
    fetched: store.fridge.fetched,
    posted: store.fridge.posted,
  }
};

const homeDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(fridgeActions, dispatch),
  }
};

export default connect(homeState, homeDispatch)(Home);
