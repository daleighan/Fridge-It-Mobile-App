import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class HomeView extends Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<View>
				<Text>homeView</Text>
			</View>
		)
	}
}

export default HomeView;