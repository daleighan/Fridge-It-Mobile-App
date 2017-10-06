import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage,
  TextInput,
  DatePickerAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';
import * as itemActions from '../../actions/itemActions.js';

class ItemAddition extends Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<View>
				<Text>Item Addition</Text>
			</View>
		)
	}
}

const fridgeState = (store) => {
  return {
    fridge: store.fridge.fridge,
    items: store.items.items
  }
};

const fridgeDispatch = (dispatch) => {
  return {
    itemActions: bindActionCreators(itemActions, dispatch)
  }
};

export default connect(fridgeState, fridgeDispatch)(ItemAddition);