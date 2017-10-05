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

import Messages from '../Message/messagesListView.js';
import Fridge from '../Fridge/fridgeView.js';
import * as fridgeActions from '../../actions/fridgeActions.js';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		AsyncStorage.getItem('name').then((name) => {
			this.props.actions.getFridge(name);
		}).catch((err) => console.log(err));
	}

	render = () => {
		const { actions, fetched, posted } = this.props;
		if (fetched || posted) {
			return (<Text>Fetched or Posted </Text>)
		} else {
			return (<Text>Not Fetched or Posted</Text>)
		}
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
