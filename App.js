import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry } from 'react-native';

import Login from './component/Login';
import Secured from './component/Secured';


export default class App extends React.Component {

  // state = {
  //   isLoggedIn: false
  // }

  render() {
    return (
       <Login/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
