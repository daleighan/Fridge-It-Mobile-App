import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  ScrollView,
  Image
} from 'react-native';

import { 
	NativeRouter, 
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
						<View style={styles.container1}>
		          <Image
		            style={styles.logo}
		            source={{uri: 'https://cdn0.iconfinder.com/data/icons/household-appliances-icons-set-cartoon-style/512/a672-512.png'}}
		          />
		          <Text style={styles.logoText}>Fridge-It</Text>
						</View>
						<View style={styles.container2}>
							<Link to='/home'>
								<Text style={styles.btn}>MY FRIDGE</Text>
							</Link>
							<Link to='/messages'>
								<Text style={styles.btn}>MESSAGES</Text>
							</Link>
							<Text style={styles.btn} onPress={this.logout}>LOGOUT</Text>
						</View>
						<Route path='/home' component={Home}/>
						<Route path='/messages' component={Messages} />
						<Route path='/addition' component={ItemAddition} />
					</View>
				</NativeRouter>
			</ScrollView>
		)
	}
} 

const styles = StyleSheet.create({
	container1: {
		paddingTop: 7,
  	width: 360,
  	height: 80,
    flexDirection: 'row', 
    backgroundColor: '#3B86D2'
  },
  container2: {
  	width: 360,
    flexDirection: 'row', 
    justifyContent: 'center',
    backgroundColor: '#3B86D2'
  },
  logo: {
    width: 70, 
    height: 70, 
    backgroundColor: '#3B86D2'
  },
  logoText: {
    width: 160, 
    height: 70, 
    fontSize: 36, 
    backgroundColor: '#3B86D2', 
    color: 'white',
    paddingLeft: 15,
    paddingTop: 8,
    marginLeft: 5,
    borderLeftWidth: 0.75,
    borderColor: 'grey'
  },
  btn: {
  	width: 120,
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