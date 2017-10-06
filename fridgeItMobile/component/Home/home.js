import React, { Component } from 'react';
import {
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
import * as itemActions from '../../actions/itemActions.js';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: ''
		}
	}

	componentDidMount() {
		const that = this;
		AsyncStorage.getItem('name').then((name) => {
			this.props.actions.getFridge(name);
			this.setState({'currentUser': name});
		})
		setTimeout(() => {
      AsyncStorage.getItem('fid').then((fId) => {
        that.props.itemActions.getItems(fId);
      })
    }, 200);
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
					<Text style={styles.btn} onPress={this.createFridge}>Create a Fridge</Text>
					<Text style={styles.prompt}>If you have not already created your own fridge, please click on "MY FRIDGE" and then create a new one and start adding items!</Text>
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
    itemActions: bindActionCreators(itemActions, dispatch)
  }
};

export default connect(homeState, homeDispatch)(Home);

const styles = StyleSheet.create({
	prompt: {
		marginTop: 60,
		marginLeft:15,
		marginRight: 15,
		fontSize: 20,
		textAlign: 'center'
	},
	btn: {
		// marginLeft: 7,
		// marginRight: 7,
		// marginTop:7,
		margin: 7,
  	height: 50,
    textAlign: 'center',
		fontSize: 14,
		borderWidth: 1,
		borderRadius: 2,
		padding: 13,
		backgroundColor: '#3B86D2',
		fontWeight: 'bold',
		color: 'white'
  }
});
