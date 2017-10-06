import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Image,
} from 'react-native';
import { 
  Route, 
  Link, 
  Redirect, 
  NativeRouter,
  nativeHistory,
} from 'react-router-native';
import Login from '../Authorization/login.js';
import SignUp from '../Authorization/signup.js';


const FixedMenu = () => {
	return(	
	<View>		
    <NativeRouter history={nativeHistory}>	
      <View>
        <View style={styles.container}>
        
          <Image
            style={styles.logo}
            source={{uri: 'https://cdn0.iconfinder.com/data/icons/household-appliances-icons-set-cartoon-style/512/a672-512.png'}}
          />
          <Text style={styles.logoText}>Fridge-It</Text>
          <Link style={styles.login} to="/login">
          	<Text style={styles.loginText}>Login</Text>
          </Link>
          <Link style={styles.logout} to="/signup">
          	<Text style={styles.loginText}>Signup</Text>
          </Link>
        </View>
        <View>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </View>
        <View> 
          <Text style={styles.splashText1}>Welcome to Fridge-It</Text>
          <Text style={styles.splashText2}>Meal planning made convenient and easy</Text>
        </View>
    	</View>
    </NativeRouter>
	</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
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
  loginText: {
    paddingLeft: 4,
    marginTop:20,
    fontSize: 18, 
    color: 'white',
  },
  login: {
    width: 55, 
    height: 70, 
    backgroundColor: '#3B86D2',
    borderLeftWidth: 0.75,
    borderColor: 'grey'
  },
  logout: {
    width: 65, 
    height: 70, 
    backgroundColor: '#3B86D2',
    borderLeftWidth: 0.75,
    borderColor: 'grey'
  },
  splashText1: {
    color: 'white', 
    fontSize: 30, 
    textAlign: 'center',
    marginTop: 100
  },
  splashText2: {
    color: 'white', 
    fontSize: 30, 
    textAlign: 'center'
  }
});


export default FixedMenu;