import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { NativeRouter, Router, Route, Link } from 'react-router-native';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';


class HomeView extends Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		console.log(this.props.history)
		return (
			<View>				
				<NativeRouter history={this.props.history}>
					<Text> Hello</Text>
				</NativeRouter>
			</View>
		)
	}

} 

export default HomeView;