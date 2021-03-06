import React, {useState} from 'react';
import {View, StatusBar, StyleSheet, Image} from 'react-native';
import ButtonC from '../../../component/Button';
import GButton from '../../../component/GButton';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Layout, Text, Input, Icon
} from '@ui-kitten/components';
import {useDispatch} from 'react-redux'
import SimpleToast from 'react-native-simple-toast';
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";
import database from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";
import iid from "@react-native-firebase/iid";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import messaging from "@react-native-firebase/messaging";
import inAppMessaging from "@react-native-firebase/in-app-messaging";
import perf from "@react-native-firebase/perf";
import storage from "@react-native-firebase/storage";


const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()


  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const Login = (login) => {
    setloading(true);
    login({
      variables: {
        username: username,
        password: password
      }
    })
      .then((res) => {
        setloading(false);
        AsyncStorage.setItem('userToken', JSON.stringify(res.data.login));
        dispatch({type: 'LOGINUSER', user: res.data.login});
        // navigation.navigate('App');
      })
      .catch((err) => {
        var a = err.graphQLErrors[0].message
        var n = a.indexOf(";:");
        SimpleToast.show(a.substring(n + 3));
        seterror(a.substring(n + 1))
        setloading(false);
      });
  }
  const login = async () => {
    if (username === "admin" && password === "admin") {
      AsyncStorage.setItem('userToken', JSON.stringify({username, password}));
      dispatch({type: 'LOGINUSER', user: {username, password}});


      const allData = await AsyncStorage.getItem('userData');
      if (allData === null) {
        let myArray = [
          {
            'id': '',
            'name': '',
            'contact': '',
            'district': '',
            'pincode': '',
            'state': '',
            'work': '',
            'date': '',
            'time': '',
            'ean': '',
            'article': '',
            'product': '',
            'category': '',
            'sr': '',
            'notes': '',
            'comments': '',
            'function1': '',
            'function2': '',
            'function3': '',
            'function4': ''
          }
        ];
        myArray.pop();
        AsyncStorage.setItem('userData', JSON.stringify(myArray));
      } else {
        console.log("object found in local storage");
      }


    } else {
      seterror("wrong username or password entered")
    }
  }
  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'}/>
  );
  let secondTextInput = null
  return (
    <Layout style={style.ViewStyle}>
      <View style={{flex: 1}}>
        <View style={style.inputContainer}>
          <Input
            placeholder="Email"
            style={{marginTop: 10}}
            autoCapitalize='none'
            onChangeText={(e) => setusername(e)}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              secondTextInput.focus();
            }}
            blurOnSubmit={false}
          />
          <Input
            ref={(input) => {
              secondTextInput = input;
            }}
            placeholder="*******"
            style={{marginTop: 10}}
            secureTextEntry={secureTextEntry}
            icon={renderIcon}
            autoCapitalize='none'
            onIconPress={onIconPress}
            onChangeText={(e) => setpassword(e)}
            onSubmitEditing={() => login()}
          />

          <GButton loading={loading} Text={'LOGIN'} onPress={() => login()}/>
          <Text status='danger'>{error}</Text>
          <View style={{alignItems: 'center'}}>
            {<Text style={style.module}>{analytics()._config.namespace}</Text>}
            {<Text style={style.module}>{auth()._config.namespace}</Text>}
            {<Text style={style.module}>{crashlytics()._config.namespace}</Text>}
            {<Text style={style.module}>{database()._config.namespace}</Text>}
            {<Text style={style.module}>{firestore()._config.namespace}</Text>}
            {<Text style={style.module}>{functions()._config.namespace}</Text>}
            {<Text style={style.module}>{iid()._config.namespace}</Text>}
            {<Text style={style.module}>{dynamicLinks()._config.namespace}</Text>}
            {<Text style={style.module}>{messaging()._config.namespace}</Text>}
            {<Text style={style.module}>{inAppMessaging()._config.namespace}</Text>}
            {<Text style={style.module}>{perf()._config.namespace}</Text>}
            {<Text style={style.module}>{storage()._config.namespace}</Text>}
          </View>
        </View>
      </View>

      <ButtonC Text={'REGISTER ?'} onPress={() => navigation.navigate('Register')}/>
    </Layout>
  )


}


const style = StyleSheet.create({
  ViewStyle: {
    padding: 30,
    flex: 1
  },
  TextStyle: {
    marginTop: 20,
    fontSize: 30,

  },
  subTextStyle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Light'
  },
  modules: {
    margin: 20,
  },
  inputStyle: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light'
  },
  inputContainer: {
    paddingTop: 40,
    flex: 1
  }
});


const mapStateToProps = (state /*, ownProps*/) => {
  return {};
};

export default connect(mapStateToProps)(Login);
