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
					return( 
					<View key={item.id}>
						<Text>{item.name}{item.quantity} </Text>
						<Text>Expiration Date: {item.expiry || 'none'}</Text>
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