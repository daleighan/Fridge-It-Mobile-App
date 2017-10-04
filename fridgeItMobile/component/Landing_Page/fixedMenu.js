import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Image
} from 'react-native';
import { 
  Router, 
  Route, 
  Link, 
  Redirect, 
  NativeRouter,
  nativeHistory
} from 'react-router-native';
import Login from '../Authorization/login.js';
import SignUp from '../Authorization/signup.js';


const FixedMenu = () => {
	return(	
	<View>				
    <NativeRouter history={nativeHistory}>
    	<View>
    		<Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://cdn0.iconfinder.com/data/icons/household-appliances-icons-set-cartoon-style/512/a672-512.png'}}
        />
        <Link to="/login">
        	<Text>Login</Text>
        </Link>
        <Link to="/signup">
        	<Text>Signup</Text>
        </Link>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
    	</View>
    </NativeRouter>
	</View>
	)
}

export default FixedMenu;