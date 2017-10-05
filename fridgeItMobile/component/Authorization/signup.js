import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Image,
  TextInput,
  Button
} from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions.js';

class Signup extends Component {
	constructor(props) {
		super(props);
	}

	emailSignUp() {
		let that = this
    let user = this.state.usernameText;
    let pw = this.state.passwordText;
    this.props.actions.emailSignUp(user, pw, that);
  };

	render() {
		return (
			<View>
				<Text>Signup</Text>
				<Text>E-mail</Text>
					<TextInput onChangeText={(text) => this.setState({ usernameText: text })} />
				<Text>Password</Text>
					<TextInput secureTextEntry={true} onChangeText={(text) => this.setState({ passwordText: text})} />
				<Button onPress={this.emailSignUp.bind(this)} title="submit" />
				<Text>Already have an account?</Text>
				<Link to="/login">
        	<Text>Login</Text>
        </Link>
			</View>
		)
	}
}

const signupDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
};

export default connect(null, signupDispatch)(Signup);