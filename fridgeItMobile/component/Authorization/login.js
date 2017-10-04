import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Image,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions.js'

class Login extends Component {
	constructor(props) {
		super(props);
	}

	emailSignin() {
    // let user = document.getElementById('inputNM');
    // let pw = document.getElementById('inputPW');
    
    this.props.actions.emailLogin(user.value, pw.value);
  };

	render() {
		return (
			<View>
				<Text>Login</Text>
				<Text>Username</Text>
					<TextInput />
				<Text>Password</Text>
					<TextInput />
			</View>
		)
	}
}

const loginDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
};

export default connect(null, loginDispatch)(Login);