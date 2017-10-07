import React from 'react';
import {
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
						<View style={styles.container1}>
							<Text style={styles.large}>{item.name}</Text>
							<Text style={styles.large}>Expiration: {item.expiry || 'none'}</Text>
						</View>
						<View style={styles.container1}>
							<View style={styles.container2}>
								<Text style={styles.large}>Quantity: {item.quantity}</Text>
								<Text style={styles.large} onPress={(e) => {
									props.actions.updateItem({
										name: item.name,
										quantity: item.quantity + 1,
										type: item.type,
									}, item.id);
								}}>+</Text>
								<Text style={styles.large} onPress={(e) => {
									props.actions.updateItem({
										name: item.name,
										quantity: item.quantity - 1,
										type: item.type,
									}, item.id);
								}}>--</Text>
							</View>
							<Text style={styles.large} onPress={(e) => {
								props.actions.deleteItem(item.id);
							}} >X</Text>
						</View>
					</View>
					)
				})
				}
			</View>
		)
	} else {
		return (
			<Text>You have no more items of this type!</Text>
		)
	}
}

export default ItemList;

const styles = StyleSheet.create({
	container1: {
		flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight:10,
	},
	container2: {
		flexDirection: 'row', 
    justifyContent: 'space-between',
	},
	large: {
		fontSize: 20
	}
});