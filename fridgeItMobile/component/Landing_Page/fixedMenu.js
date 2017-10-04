import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Image
} from 'react-native';
import { Router, Route, Link, Redirect, NativeRouter } from 'react-router-native';

const FixedMenu = (props) => {	
	return(	
	<View>				
    <NativeRouter>
    	<View>
    		<Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://cdn0.iconfinder.com/data/icons/household-appliances-icons-set-cartoon-style/512/a672-512.png'}}
        />
        <Link to="/login">
        	<Text>Login</Text>
        </Link>
        <Link to="/signup">
        	<Text>Logout</Text>
        </Link>
        <Route path="/login" render={() => (<Text>Login</Text>)} />
        <Route path="/signup" render={() => (<Text>Logout</Text>)} />
    	</View>
    </NativeRouter>
	</View>
	)
}

export default FixedMenu;