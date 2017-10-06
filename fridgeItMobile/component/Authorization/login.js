import React, { Component } from 'react';
import {
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

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usernameText: '',
			passwordText: ''
		}
	}

	emailSignin = () => {
		let that = this;
    let user = this.state.usernameText;
    let pw = this.state.passwordText;
    this.props.actions.emailLogin(user, pw, that);
  }

	render(props) {
		return (
			<View style={styles.body}>
				<Text style={styles.txt1}>Login</Text>
				<Text style={styles.txt2}>E-mail</Text>
					<TextInput onChangeText={(text) => this.setState({ usernameText: text })} />
				<Text style={styles.txt2}>Password</Text>
					<TextInput secureTextEntry={true} onChangeText={(text) => this.setState({ passwordText: text})} />
				<Button style={styles.btn} onPress={this.emailSignin} title="submit" />
				<Text style={styles.txt2}>Don't have an account yet?</Text>
				<Link to="/signup">
        	<Text style={styles.signup}>SIGNUP</Text>
        </Link>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: 'white',
		flexDirection: 'column', 
		justifyContent: 'center',
		paddingLeft: 12,
		paddingRight: 7,
		borderRadius: 10,
		marginLeft: 10,
		marginRight: 10,
		padding: 10,
	},
	txt1: {
		fontSize: 26,
		paddingTop: 3
	},
	txt2: {
		fontSize: 20,
		paddingTop: 3,
		paddingBottom: 6
	},
	btn: {
		borderRadius: 5
	},
	signup: {
		textAlign: 'center',
		fontSize: 14,
		borderWidth: 1,
		borderRadius: 2,
		padding: 5
	}
});

const loginDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
};

export default connect(null, loginDispatch)(Login);