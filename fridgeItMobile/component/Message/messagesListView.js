import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MessageListEntry from './messageListEntry.js';
import * as messageActions from '../../actions/messageActions.js';

class MessageListView extends Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<Text>Messages</Text>
		)
	}
}

//monitors state with redux
const mapState = (store) => {
  return {
    fridge: store.fridge.fridge,
    fridgePosted: store.fridge.posted,
    fridgeFetched: store.fridge.fetched,
    messageList: store.message.messages,
    messageFetched: store.message.fetched,
    messageFetching: store.message.fetching,
    messageError: store.message.error,
    username: store.auth.username,
  }
};

//brings in actions. bindActionCreators lets us use actions as props
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(messageActions, dispatch),
  }
};

//connects state and dispatch to MessageListView component
export default connect(mapState, mapDispatch)(MessageListView);