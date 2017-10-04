import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Image,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions.js';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usernameText: '',
			passwordText: ''
		}
	}

	emailSignin() {
    let user = this.state.usernameText;
    let pw = this.state.passwordText;
    this.props.actions.emailLogin(user, pw);
  };

	render() {
		return (
			<View>
				<Text>Login</Text>
				<Text>Username</Text>
					<TextInput onChangeText={(text) => this.setState({ usernameText: text })} />
				<Text>Password</Text>
					<TextInput onChangeText={(text) => this.setState({ passwordText: text})} />
				<Button onPress={this.emailSignin.bind(this)} title="submit" />
				<Text>Don't have an account yet?</Text>
				<Link to="/signup">
        	<Text>Signup</Text>
        </Link>
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