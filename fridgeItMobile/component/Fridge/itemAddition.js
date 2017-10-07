import React, { Component } from 'react';
import {
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
			itemQTY: 0,
			date: ''
		}
	}

	handleSubmit = () => {
		const { itemActions, fridge } = this.props;
		AsyncStorage.getItem('name').then((user) => {
			let item = {
				name: this.state.itemName,
				quantity: this.state.itemQTY,
				type: this.state.foodType,
				user: user,
				expiry: this.state.date
			}
			itemActions.addItem(item, fridge.id);
		});
	}

	render = () => {
		return (
			<View style={styles.container}>
				<Text style={styles.txtLarge}>Add an Item</Text>
				<Text style={styles.txt}>Item Name</Text>
				<TextInput onChangeText={(text) => this.setState({ itemName: text })} />
				<Text style={styles.txt}>Item Quantity</Text>
				<TextInput defaultValue="0" onChangeText={(number) => this.setState({ itemQTY: number })} />
				<Text style={styles.txt}>Food Type</Text>
				<Picker 
					style={styles.picker}
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
				<Text style={styles.txt}>Expiration Date:</Text>
				<DatePicker 
					style={{width: 200}}
	        date={this.state.date}
	        mode="date"
	        placeholder="select date"
	        format="YYYY-MM-DD"
	        confirmBtnText="Confirm"
	        cancelBtnText="Cancel"
	        customStyles={{
	          dateIcon: {
	            position: 'absolute',
	            left: 0,
	            top: 4,
	            marginLeft: 0
	          },
	          dateInput: {
	            marginLeft: 36
	          }
	        }}
	        onDateChange={(date) => {this.setState({date: date})}}
				/> 
				<Text style={styles.btn} onPress={this.handleSubmit}>Submit</Text> 
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

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	btn: {
		marginTop: 10,
  	height: 50,
    textAlign: 'center',
		fontSize: 14,
		borderWidth: 1,
		borderRadius: 2,
		padding: 13,
		backgroundColor: '#3B86D2',
		fontWeight: 'bold',
		color: 'white'
  },
  txtLarge: {
  	fontSize: 26,
  	textAlign: 'center',
  	marginBottom: 10
  },
  txt: {
  	fontSize: 20
  },
  picker: {
  	width: 360
  }
});