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

import { 
	NativeRouter, 
	Router, 
	Route, 
	Link, 
	nativeHistory, 
} from 'react-router-native';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions.js';

import Home from '../Home/home.js';


class HomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''	
		}
	}


	logout = (e) => {
		let that = this
		e.preventDefault();
    this.props.actions.logoutUser(that);
	}

	componentWillMount = () => {
		AsyncStorage.getItem('name').then((name) => {
			this.setState({ name, });
		});
	}

	render = () => {
		return (
			<View>				
				<NativeRouter history={nativeHistory}>
					<View>
						<View>
							<Link to="/home">
								<Text>Go Home</Text>
							</Link>
							<Text>{this.state.name}</Text>
							<Button onPress={this.logout} title="Logout" />
						</View>
						<Route path="/home" component={Home} />
					</View>
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