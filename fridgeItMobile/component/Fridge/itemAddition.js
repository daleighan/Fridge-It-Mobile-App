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

import * as itemActions from '../../actions/itemActions.js';

class ItemAddition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodType: 'produce',
			expirationDate: '',
			itemName: '',
			itemQTY: 0
		}
	}

	handleSubmit = () => {
		const { itemActions, fridge } = this.props;
		AsyncStorage.getItem('name').then((user) => {
			console.log(this.state.foodType);
			let item = {
				name: this.state.itemName,
				quantity: this.state.itemQTY,
				type: this.state.foodType,
				user: user
			}
			itemActions.addItem(item, fridge.id);
		});
	}

	render = () => {
		return (
			<View>
				<Text>Add an Item</Text>
				<Text>Item Name</Text>
				<TextInput onChangeText={(text) => this.setState({ itemName: text })} />
				<Text>Item Quantity</Text>
				<TextInput defaultValue="0" onChangeText={(number) => this.setState({ itemQTY: number })} />
				<Text>Food Type</Text>
				<Picker 
					selectedValue={this.state.foodType}
					onValueChange={(itemValue, itemIndex) => this.setState({foodType: itemValue})
				}>
					<Picker.Item label="produce" value="produce" />
					<Picker.Item label="dairy" value="dairy" />
					<Picker.Item label="protein" value="protein" />
					<Picker.Item label="grains and starches" value="grains" />
					<Picker.Item label="frozen" value="frozen" />
					<Picker.Item label="miscellaneous" value="misc" />
				</Picker>
				<Text>Expiration Date:</Text>
				<DatePicker 
					onDateChange={(date) => {this.setState({ date, })}}
				/> 
				<Button title="Submit" onPress={this.handleSubmit} />
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