import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Input, ThemeProvider } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Mybutton from './components/Mybutton';


export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      emailPattern: '',
      passwordPattern: '',
    };
  }
  newScreen = (window) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: window
      }
    });
  };

  validate(text, type) {
    emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (type === 'email') {
      if (emailPattern.test(text)) {
        return true
      } else {
        return false
      }
    }
    passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
    if (type === 'password') {
      if (passwordPattern.test(text)) {
        return true
      } else {
        return false
      }
    }
  }

  register_user = () => {
    const { username } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    const { confirmPassword } = this.state;
    if (username) {
      if (email) {
        if (password) {
          if (password === confirmPassword) {
            if (this.validate(email, 'email')) {
              fetch('http://www.server-digital-resume-portfolio.pl/mobile/auth/signup', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  email: email,
                  password: password
                })
              }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson)
                  if (responseJson.statusCode === '201') {
                    AsyncStorage.setItem('token', responseJson.token);
                    AsyncStorage.setItem('role', responseJson.role);
                    AsyncStorage.setItem('email', email);
                    this.newScreen('EditProfileScreen');
                    ToastAndroid.show('YOU ARE REGISTERED SUCCESSFULLY', ToastAndroid.SHORT);
                  } else if (responseJson.statusCode === '409') {
                    ToastAndroid.show('REGISTRATION FAILED ' + responseJson.Code + ' ' + responseJson.statusMessage + ' ' + responseJson.message, ToastAndroid.SHORT);
                  } else if (responseJson.status === '400') {
                    ToastAndroid.show(responseJson.error + ' ' + responseJson.message, ToastAndroid.SHORT);
                  }
                })
            } else { ToastAndroid.show('Invalid email address', ToastAndroid.SHORT); }
          } else { ToastAndroid.show('Password are not the same', ToastAndroid.SHORT); }
        } else { ToastAndroid.show('Please enter your password', ToastAndroid.SHORT); }
      } else { ToastAndroid.show('Please enter your email', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Please enter your username', ToastAndroid.SHORT); }
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
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#ffffff', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Registration</Text>

        </View>
        <View style={styles.registerIcon}>
          <Entypo style={styles.iconLogout} name={'documents'} size={70} color={'white'} />
        </View>

        <ThemeProvider
          theme={{
            Input: {
              containerStyle: {
              },
              inputContainerStyle: {
                borderRadius: 40,
                borderWidth: 1,
                borderColor: 'rgba(110, 120, 170, 1)',
                height: 50,
                marginVertical: 10,
              },
              placeholderTextColor: 'rgba(110, 120, 170, 1)',
              inputStyle: {
                marginLeft: 10,
                color: 'white',
              },
              keyboardAppearance: 'light',
              blurOnSubmit: false,
            },
          }}
        >
          <View style={{ alignItems: 'center', paddingBottom: 30, }}>
            <Input
              leftIcon={<SimpleIcon name="user" color="rgba(110, 120, 170, 1)" size={25} />}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={username => this.setState({ username })}
            />

            <Input leftIcon={<MaterialIcon name="email-outline" color="rgba(110, 120, 170, 1)" size={25} />}
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={email => this.setState({ email })}
            />

            <Input leftIcon={<SimpleIcon name="lock" color="rgba(110, 120, 170, 1)" size={25} />}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              onChangeText={password => this.setState({ password })}
            />


            <Input leftIcon={<SimpleIcon name="lock" color="rgba(110, 120, 170, 1)" size={25} />}
              placeholder="Confirm Password"
              autoCapitalize="none"
              keyboardAppearance="light"
              secureTextEntry={true}
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
            />

          </View>
        </ThemeProvider>

        <Mybutton
          title="Submit"
          customClick={this.register_user.bind(this)}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(46, 50, 72, 1)',
  },

  buttonLogout: {
    marginLeft: 20,
    marginTop: 12,
    marginBottom: 10,
    paddingRight: 40,
  },
  loginIcon: {
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },

  registerIcon: {
    marginTop: 10,
    alignSelf: 'center'
  },
  toolbar: {
    backgroundColor: '#da2626',
    alignItems: 'center',
    flexDirection: "row",
  },
  textTab: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
});
