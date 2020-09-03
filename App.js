import React from 'react';
import {StyleSheet, Platform, Image, Text, View, ScrollView} from 'react-native';
import {Alert} from 'react-native';

import firebase from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import storage from '@react-native-firebase/storage';
import crashlytics from '@react-native-firebase/crashlytics';
import database from '@react-native-firebase/database';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import iid from '@react-native-firebase/iid';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import perf from '@react-native-firebase/perf';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    this.checkPermission()
    this.createNotificationListeners();
  }

  async createNotificationListeners() {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }


  async checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let firebasetokenid = await messaging().getToken();
    if (firebasetokenid) {
      console.log("firebasetokenid" + firebasetokenid)
    } else {
      this.getToken();
    }
  }

  async requestPermission() {
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
    }
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image source={require('./assets/ReactNativeFirebase.png')} style={[styles.logo]}/>
          <Text style={styles.welcome}>
            Welcome to {'\n'} React Native Firebase
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          {Platform.OS === 'ios' ? (
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+D or shake for dev menu
            </Text>
          ) : (
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload,{'\n'}
              Cmd+M or shake for dev menu
            </Text>
          )}
          <View style={styles.modules}>
            <Text style={styles.modulesHeader}>The following Firebase modules are pre-installed:</Text>
            {<Text style={styles.module}>{analytics()._config.namespace}</Text>}
            {<Text style={styles.module}>{auth()._config.namespace}</Text>}
            {<Text style={styles.module}>{crashlytics()._config.namespace}</Text>}
            {<Text style={styles.module}>{database()._config.namespace}</Text>}
            {<Text style={styles.module}>{firestore()._config.namespace}</Text>}
            {<Text style={styles.module}>{functions()._config.namespace}</Text>}
            {<Text style={styles.module}>{iid()._config.namespace}</Text>}
            {<Text style={styles.module}>{dynamicLinks()._config.namespace}</Text>}
            {<Text style={styles.module}>{messaging()._config.namespace}</Text>}
            {<Text style={styles.module}>{inAppMessaging()._config.namespace}</Text>}
            {<Text style={styles.module}>{perf()._config.namespace}</Text>}
            {<Text style={styles.module}>{storage()._config.namespace}</Text>}
          </View>
        </View>
      </ScrollView>
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
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
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
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
