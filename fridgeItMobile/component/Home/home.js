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

import Messages from '../Message/messagesListView.js';
import Fridge from '../Fridge/fridgeView.js';
import * as fridgeActions from '../../actions/fridgeActions.js';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: ''
		}
	}

	componentWillMount() {
		AsyncStorage.getItem('name').then((name) => {
			this.props.actions.getFridge(name);
			this.setState({'currentUser': name});
		}).catch((err) => console.log(err));
	}

	createFridge = (e) => {
		e.preventDefault();
		const fridgeObj = {
      users: [this.state.currentUser],
      name: this.state.currentUser,
      phone: '',
    }
    this.props.actions.addFridge(fridgeObj);
	}

	render = () => {
		const { actions, fetched, posted } = this.props;
		if (fetched || posted) {
			return (
				<View>
					<Fridge />
				</View>
			)
		} else {
			return (
				<View>
					<Button title="Create a Fridge" onPress={this.createFridge} />
				</View>
			)
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
