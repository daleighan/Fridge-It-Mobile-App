import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Link, Redirect } from 'react-router-native';
import localStorage from 'react-native-local-storage';

import HomeView from './Home/homeView.js';
import FixedMenu from './Landing_Page/fixedMenu.js';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		if(localStorage.get('userid')) {
      return (
        <View>
        	<Text>found</Text>
        	<HomeView />
        </View>
      )
    } else {
      return (
        <View>
          <Text>not found</Text>
        </View>
      );
    }
	}
}

export default App;