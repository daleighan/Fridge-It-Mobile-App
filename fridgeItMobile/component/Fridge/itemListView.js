import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage,
  TextInput
} from 'react-native';

const ItemList = (props) => {
	if (props.items.length) {
		return (
			<View>
				{props.items.map(item => {
					if (item.quantity === 0) {
						props.actions.deleteItem(item.id);
					}
					return( 
					<View key={item.id}>
						<Text>{item.name}</Text>
						<Text>Quantity: {item.quantity}</Text>
						<Text>Expiration Date: {item.expiry || 'none'}</Text>
						<Button title="+" onPress={(e) => {
							
							props.actions.updateItem({
								name: item.name,
								quantity: item.quantity + 1,
								type: item.type,
							}, item.id);
						}} />
						<Button title="-" onPress={(e) => {
							props.actions.updateItem({
								name: item.name,
								quantity: item.quantity - 1,
								type: item.type,
								fridgeId: props.fridge.id,
								user: props.fridge.name
							}, item.id);
						}} />
						<Button title="X" onPress={(e) => {
							props.actions.deleteItem(item.id);
						}} />
					</View>
					)
				})
				}
			</View>
		)
	} else {
		return (
			<Text>No Items in This Category</Text>
		)
	}
}

export default ItemList;