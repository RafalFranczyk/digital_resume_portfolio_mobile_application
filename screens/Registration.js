import React, {Component} from 'react';
import {AsyncStorage,StyleSheet, Text,ScrollView,TouchableOpacity, Image, View,KeyboardAvoidingView, Alert } from 'react-native';
import {Navigation} from 'react-native-navigation';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            confirmPassword:'',
            emailPattern:'',
            passwordPattern:'',
    };
}
newScreen = (window) => {
  Navigation.push(this.props.componentId, {
      component: {
          name: window
      }
  });
};

validate(text,type)
{
  emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (type === 'email')
  {
    if (emailPattern.test(text)){
        return true
    }else{
      return false
    }
  }
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
  if(type === 'password')
  {
    if(passwordPattern.test(text)){
      return true
    }else{
      return false
    }
  }
}

register_user = () => {
  const { username } = this.state;
  const { email } = this.state;
  const { password } = this.state;
  const { confirmPassword} = this.state;
  if(username){
    if (email) {
      if (password) {
          if(password === confirmPassword){
            if(this.validate(email,'email')){
                fetch('http://www.digital-resume-portfolio.pl/auth/signup', {
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
                      .then((responseJson)=> {
                        console.log(responseJson)
                        if (responseJson.statusCode === '200') {
                          AsyncStorage.setItem('token',responseJson.token);
                          AsyncStorage.setItem('role',responseJson.role);
                          this.newScreen('routesUser');
                          ToastAndroid.show('YOU ARE REGISTERED SUCCESSFULLY', ToastAndroid.SHORT);
                        }else if(responseJson.statusCode === '409') {
                            ToastAndroid.show('REGISTRATION FAILED '+ responseJson.Code + ' ' + responseJson.statusMessage + ' ' + responseJson.message, ToastAndroid.SHORT);
                          }else if(responseJson.status === '400'){
                            ToastAndroid.show(responseJson.error + ' ' + responseJson.message, ToastAndroid.SHORT);
                          }
                    })            
              }else{
                ToastAndroid.show('Invalid email address', ToastAndroid.SHORT);
              }
            }else{
              ToastAndroid.show('Password are not the same', ToastAndroid.SHORT);
            }
      }else {
        ToastAndroid.show('Please enter your password', ToastAndroid.SHORT);
      }
    }else {
      ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
    }
  }else{
  ToastAndroid.show('Please enter your username', ToastAndroid.SHORT);
  }

};  
  render() {
    return (
        <View style={styles.container}>
      <View style={styles.toolbar}>
      <Text style={styles.textTab}>Register</Text>
      </View>
      <View style={styles.registerIcon}>
        <Image source={require('../img/registerIcon.png')} />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            
            <Mytextinput
              placeholder="Enter Username"
              onChangeText={username => this.setState({ username })}
            />
            <Mytextinput
              placeholder="Enter Email"
              onChangeText={email => this.setState({ email })}
            />
            <Mytextinput
              secureTextEntry={true}
              placeholder="Enter Password"
              onChangeText={password => this.setState({ password })}
            />
            <Mytextinput
              secureTextEntry={true}
              placeholder="Confirm Password"
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
            />      
            <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  registerIcon:{
    marginTop: 10,
    alignSelf: 'center'
  },
  toolbar: {
    backgroundColor: '#da2626',
    alignItems: 'center',
  },
  textTab: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
    textAlign:'center',
    marginTop:10,
    marginBottom:10
  },
});
