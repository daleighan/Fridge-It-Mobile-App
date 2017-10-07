import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  TextInput,
  Image
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
    AsyncStorage.getItem('fid').then((fId) => {
      that.props.actions.fetchMessages(fId);
    });
  }

  handleSubmit = () => {
    const { fridge, username, actions } = this.props;
    actions.postMessages(fridge.id, username, this.state.text);
  }

	render = () => {
    const { messageList, username, actions } = this.props;
		return (
			<View style={styles.container}>
        <Text style={styles.txt}>Post A Message!</Text>
        <TextInput onChangeText={(text) => this.setState({ text, })} />
        <Text style={styles.btn} onPress={this.handleSubmit}>Post Message</Text>
        <Text style={styles.txt}>This Fridge's Messages:</Text>
          {messageList.map((message) => {
            return (
              <View key={message.id} style={styles.message}>
                <View style={styles.img}>
                  <Image style={{ width: 20, height: 20}} source={require('./pin-light-blue.png')} />
                </View>
                <Text style={styles.txt2}>User: {message.user}</Text>
                <Text style={styles.txt2}>Message: {message.messageText}</Text>
                <Moment style={styles.time} fromNow element={Text} date={message.createdAt} />
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

const styles = StyleSheet.create({
  container: {
    margin: 15
  },
  img: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 15
  },
  txt: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  txt2: {
    fontSize: 17,
    marginBottom: 7
  },
  time:{
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
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
  message: {
    margin: 18,
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#fff382'
  }
});