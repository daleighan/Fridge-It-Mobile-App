import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import * as messageActions from '../../actions/messageActions.js';

class MessageListView extends Component {
	constructor(props) {
		super(props);
    this.state = {
      text: ''
    }
	}

  componentWillMount() {
    const that = this;
    AsyncStorage.getItem('fid').then((user) => {
      that.props.actions.fetchMessages(user);
    });
  }

  handleSubmit = () => {
    const { fridge, username, actions } = this.props;
    actions.postMessages(fridge.id, username, this.state.text);
  }

	render = () => {
    const { messageList, username, actions } = this.props;
		return (
			<View>
        <Text>Post A Message!</Text>
        <TextInput onChangeText={(text) => this.setState({ text, })} />
        <Button title='Post Message' onPress={this.handleSubmit} />
        <Text>This Fridge's Messages:</Text>
          {messageList.map((message) => {
            return (
              <View key={message.id}>
                <Text>user: {message.user}</Text>
                <Text>{message.messageText}</Text>
                <Moment fromNow element={Text} date={message.createdAt} />
                {
                  message.user === username ? <Button title="Delete" onPress={() => actions.deleteMessages(message.id)} /> : null
                }
              </View>
            )
          })}
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