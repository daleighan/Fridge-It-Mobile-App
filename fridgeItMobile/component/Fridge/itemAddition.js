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
  DatePickerAndroid,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker';

import moment from 'moment';
import * as itemActions from '../../actions/itemActions.js';

class ItemAddition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodType: '',
			expirationDate: ''
		}
	}

	render = () => {
		console.log(this.state);
		return (
			<View>
				<Text>Add an Item</Text>
				<Picker 
					selectedValue={this.state.foodType}
					onValueChange={(itemValue, itemIndex) => this.setState({foodType: itemValue})
				}>
					<Picker.Item label="produce" value="produce" />
					<Picker.Item label="dairy" value="dairy" />
					<Picker.Item label="protein" value="protein" />
					<Picker.Item label="grains and starches" value="grains and starches" />
					<Picker.Item label="frozen" value="frozen" />
					<Picker.Item label="miscellaneous" value="miscellaneous" />
				</Picker>
				<Text>Expiration Date:</Text>
				<DatePicker 
					onDateChange={(date) => {this.setState({ date, })}}
				/> 
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