import React, {Component} from 'react';
import {StyleSheet, Text,ScrollView,Image, View,KeyboardAvoidingView, Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
        email:'',
        password:'',
        passwordCheck:'',
        emailCheck:'',
        emailPattern:'',
        emailAsync:'',
        id_user:'',
    };
  }
newScreen = (window) => {
  Navigation.setStackRoot(this.props.componentId, {
      component: {
          name: window
      }
  });
};

login_user =() =>{
  Alert.alert(
    'Success',
    'YOU ARE Login SUCCESSFULLY',
    [
      {
       text: 'Ok',
        onPress: () =>
          this.newScreen('UserNavigationScreen')
      },
    ],
    { cancelable: false }
  );
}
render() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={{fontWeight: 'bold',fontSize: 30,color: '#ffffff',textAlign:'center',marginTop:10,marginBottom:10}}>Login</Text>
      </View>
      <View style={styles.loginIcon}>
          <Image source={require('../img/login.png')} />
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
              secureTextEntry={true}
              placeholder="Enter Password"
              onChangeText={password => this.setState({ password })}
            />
            <Mybutton
              title="Submit"
              customClick={this.login_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginIcon:{
    marginTop: 20,
    alignSelf: 'center',
    marginBottom:20,

  },
  toolbar: {
    backgroundColor: '#da2626',
  },
  
});