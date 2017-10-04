/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';



import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import createHistory from 'history/createMemoryHistory';
import { Router } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger as logger } from 'redux-logger';
import promise from 'redux-promise-middleware';

import FridgeApp from './reducers';

const history = createHistory();
const middleware = applyMiddleware(promise(), thunk, logger(), routerMiddleware(history));
const store = createStore(FridgeApp, middleware);


export default class fridgeItMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>is it still here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  hello: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('fridgeItMobile', () => fridgeItMobile);
