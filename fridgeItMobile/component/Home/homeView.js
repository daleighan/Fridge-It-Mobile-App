import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage,
  ScrollView
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
import Messages from '../Message/messagesListView.js';
import Fridge from '../Fridge/fridgeView.js';


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
			<ScrollView>				
				<NativeRouter history={nativeHistory}>
					<View>
						<View>
							<Link to="/home">
								<Text style={styles.btn}>Go Home</Text>
							</Link>
							<Link to="/messages">
								<Text style={styles.btn}>Messages</Text>
							</Link>
							<Text style={styles.btn}>{this.state.name}</Text>
							<Button onPress={this.logout} title="Logout" />
						</View>
						<Route path="/home" component={Home} />
						<Route path="/messages" component={Messages} />
					</View>
				</NativeRouter>
			</ScrollView>
		)
	}
} 

const styles = StyleSheet.create({
  btn: {
    fontSize: 30
  }
});


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