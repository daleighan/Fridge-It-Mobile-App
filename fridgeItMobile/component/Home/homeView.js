import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { 
	NativeRouter, 
	Router, 
	Route, 
	Link, 
	nativeHistory 
} from 'react-router-native';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions.js';


class HomeView extends Component {
	constructor(props) {
		super(props);
	}


	logout = (e) => {
		let that = this
		e.preventDefault();
    this.props.actions.logoutUser(that);
	}

	render = () => {
		return (
			<View>				
				<NativeRouter history={nativeHistory}>
					<Button onPress={this.logout} title="Logout" />
				</NativeRouter>
			</View>
		)
	}
} 


const homeState = (store) => {
  return {
    username: store.auth.username,
  }
};

const homeDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
};

export default connect(homeState, homeDispatch)(HomeView);