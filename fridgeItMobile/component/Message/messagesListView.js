import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MessageListEntry from './messageListEntry.js';
import * as messageActions from '../../actions/messageActions.js';

class MessageListView extends Component {
	constructor(props) {
		super(props);
    this.state = {
      text: ''
    }
	}

  handleSubmit = () => {
    console.log(this.props)
    const { fridge, username, actions } = this.props;
    actions.postMessages(fridge.id, username, this.state.text);
  }

	render = () => {
		return (
			<View>
        <Text>Post A Message!</Text>
        <TextInput onChangeText={(text) => this.setState({ text, })} />
        <Button title='Post Message' onPress={this.handleSubmit} />
      </View>
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