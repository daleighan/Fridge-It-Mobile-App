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
	console.log('itemlistprops', props);
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
}

export default ItemList;