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

register_user = () => {
  alert("Rejestracja");
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
