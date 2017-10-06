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
import * as fridgeActions from '../../actions/fridgeActions.js';

import Home from '../Home/home.js';
import Messages from '../Message/messagesListView.js';
import Fridge from '../Fridge/fridgeView.js';
import ItemAddition from '../Fridge/itemAddition.js';


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
		}).then(() => {
			this.props.fridgeActions.getFridge(this.state.name);
		}).catch((err) => console.log(err));
	}

	render = () => {
		return (
			<ScrollView>				
				<NativeRouter history={nativeHistory}>
					<View>
						<View>
							<Link to="/home">
								<Text style={styles.btn}>My Fridge</Text>
							</Link>
							<Link to="/messages">
								<Text style={styles.btn}>Current Fridge Messages</Text>
							</Link>
							<Text style={styles.btn}>{this.state.name}</Text>
							<Button onPress={this.logout} title="Logout" />
						</View>
						<Route path="/home" component={Home}/>
						<Route path="/messages" component={Messages} />
						<Route path="/addition" component={ItemAddition} />
					</View>
				</NativeRouter>
			</ScrollView>
		)
	}
} 

const styles = StyleSheet.create({
  btn: {
    fontSize: 20
  }
});


const homeState = (store) => {
  return {
    username: store.auth.username,
  }
};

const homeDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch),
    fridgeActions: bindActionCreators(fridgeActions, dispatch)
  }
};

export default connect(homeState, homeDispatch)(HomeView);