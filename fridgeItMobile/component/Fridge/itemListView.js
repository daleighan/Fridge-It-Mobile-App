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
					<Text key={item.id}>{item.name}{item.quantity} </Text>
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