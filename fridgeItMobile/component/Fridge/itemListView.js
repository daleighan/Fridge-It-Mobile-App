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
					<View style={styles.item} key={item.id}>
						<View>
							<View style={styles.container1}>
								<Text style={styles.large}>{item.name}</Text>
								<Text style={styles.large}>Expiration: {item.expiry || 'none'}</Text>
							</View>
							<View style={styles.container1}>
								<View style={styles.container2}>
									<Text style={styles.large}>Quantity: {item.quantity}</Text>
									<View style={styles.operatorHolder1}>
										<Text style={styles.operator} onPress={(e) => {
											props.actions.updateItem({
												name: item.name,
												quantity: item.quantity + 1,
												type: item.type,
											}, item.id);
										}}> + </Text>
										</View>
									<View style={styles.operatorHolder1}>
										<Text style={styles.operator} onPress={(e) => {
											props.actions.updateItem({
												name: item.name,
												quantity: item.quantity - 1,
												type: item.type,
											}, item.id);
										}}> - </Text>
									</View>
								</View>
								<View style={styles.operatorHolder2}>
									<Text style={styles.operator} onPress={(e) => {
										props.actions.deleteItem(item.id);
									}} >x</Text>
								</View>
							</View>
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
	item: {
		borderWidth: 0.5,
		borderRadius: 5,
		padding: 3,
		marginBottom: 3,
	},
	container1: {
		flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight:10,
	},
	container2: {
		flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 10,
	},
	operatorHolder1: {
		width: 30,
		marginLeft: 5,
		borderWidth: 0.5,
		borderRadius: 20,
		paddingBottom:4,
	},
	operatorHolder2: {
		width: 30,
		height: 40,
		marginLeft: 5,
		marginTop: 8,
		borderWidth: 0.5,
		borderRadius: 20,
	},
	operator: {
		fontSize: 24,
		textAlign: 'center',
	},
	large: {
		fontSize: 20,
		marginTop: 5,
		marginRight: 10,
	}
});