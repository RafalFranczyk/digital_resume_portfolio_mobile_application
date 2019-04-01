import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Mybutton from './components/Mybutton';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordCheck: '',
      emailCheck: '',
      emailPattern: '',
      emailAsync: '',
      id_user: '',
      usernameOrEmail: '',
    };
  }
  newScreen = (window) => {
    Navigation.setStackRoot(this.props.componentId, {
      component: {
        name: window
      }
    });
  };

  login_user = () => {
    const { usernameOrEmail } = this.state;
    const { password } = this.state;

    if (usernameOrEmail) {
      if (password) {
        fetch('http://www.digital-resume-portfolio.pl/auth/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usernameOrEmail: usernameOrEmail,
            password: password
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.statusCode === '200') {
              AsyncStorage.setItem('token', responseJson.token);
              AsyncStorage.setItem('role', responseJson.role[0]);
              AsyncStorage.setItem('email', usernameOrEmail);
              if (responseJson.profile === 'null') {
                this.newScreen('EditProfileScreen');
                ToastAndroid.show('Your Profile is Empty , Please enter details', ToastAndroid.SHORT);
              } else {
                if (responseJson.role[0] === 'ROLE_USER') {
                  this.newScreen('routesUser');
                  ToastAndroid.show('Hello My Friend ' + username + ' :)', ToastAndroid.SHORT);
                } else if (responseJson.role[0] === 'ROLE_ADMIN') {
                  this.newScreen('routesAdmin');
                  ToastAndroid.show('Hello My Friend ' + username + ' :)', ToastAndroid.SHORT);
                }
              }
            } else if (responseJson.statusCode === '401') {
              ToastAndroid.show('Login FAILED ' + responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
            } else if (responseJson.status === '400') { ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT); }
          })
      } else { ToastAndroid.show('Please Enter your password :)', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Please Enter your username :)', ToastAndroid.SHORT); }
  };

  backToHome = () => {
    this.newScreen('App');
    ToastAndroid.show('Welcome in Home Screen', ToastAndroid.SHORT)
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.buttonLogout} onPress={this.backToHome.bind(this)}>
            <MaterialIcons style={styles.iconLogout} name={'keyboard-backspace'} size={35} color={'white'} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#ffffff', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Login</Text>


        </View>
        <View style={styles.loginIcon}>
          <Ionicons style={styles.iconLogout} name={'ios-person'} size={70} color={'white'} />
        </View>

        <View style={{ width: 100 + "%", alignItems: 'center' }}>
          <View style={styles.overlay}>
            <View style={styles.triangleLeft} />
            <Input
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'white',
                borderLeftWidth: 0,
                width: (80 + "%"),
                height: 50,
                backgroundColor: 'white',
              }}
              leftIcon={<MaterialIcon name="email-outline" color="black" size={25} />}
              leftIconContainerStyle={{
                marginRight: 10,
              }}
              containerStyle={{ paddingHorizontal: 0 }}
              placeholder="Email or Username"
              placeholderTextColor="black"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="light"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={usernameOrEmail => this.setState({ usernameOrEmail })}
            />
            <View style={styles.triangleRight} />
          </View>

          <View style={[styles.overlay, { marginBottom: 30, marginTop: 10 }]}>
            <View style={styles.triangleLeft} />
            <Input
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'white',
                borderLeftWidth: 0,
                width: (80 + "%"),
                height: 50,
                backgroundColor: 'white',
              }}
              leftIconContainerStyle={{
                marginRight: 10,
              }}
              containerStyle={{ paddingHorizontal: 0 }}
              leftIcon={<SimpleIcon name="lock" color="black" size={25} />}
              placeholder="Password"
              placeholderTextColor="black"
              autoCapitalize="none"
              keyboardAppearance="light"
              secureTextEntry={true}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              blurOnSubmit={true}
              onChangeText={password => this.setState({ password })}
            />
            <View style={styles.triangleRight} />
          </View>
        </View>
        <Mybutton
          title="Submit"
          customClick={this.login_user.bind(this)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F343B',
  },
  buttonLogout: {
    marginLeft: 20,
    marginTop: 12,
    paddingRight: 80,
  },
  loginIcon: {
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  toolbar: {
    backgroundColor: '#da2626',
    flexDirection: "row",
  },
  triangleLeft: {
    position: 'absolute',
    left: -20,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  triangleRight: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
});