import React, {Component} from 'react';
import {StyleSheet, Text,ScrollView,Image, View,KeyboardAvoidingView, Alert,AsyncStorage} from 'react-native';
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
  const { username } = this.state;
    const { password } = this.state;
 
    if (username) {
      if (password) {
          fetch('http://www.digital-resume-portfolio.pl/auth/signin', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password
                    })
                  }).then((response) => response.json())
                      .then((responseJson)=> {
                        if (responseJson.statusCode === '200') {
                          console.log(typeof responseJson.role)
                          console.log(responseJson.role)
                          console.log(responseJson.role[0])
                          AsyncStorage.setItem('token',responseJson.token);
                          AsyncStorage.setItem('role',responseJson.role[0])
                            if(responseJson.role[0] === 'ROLE_USER'){
                              Alert.alert(
                                'Success',
                                'ITS OK USER',
                                [
                                  {
                                   text: 'Ok',
                                    onPress: () =>
                                      this.newScreen('routesUser')
                                  },
                                ],
                                { cancelable: false }
                              );
                              }else if(responseJson.role[0] === 'ROLE_ADMIN'){
                                Alert.alert(
                                  'Success',
                                  'ITS OK ADMIN',
                                  [
                                    {
                                     text: 'Ok',
                                      onPress: () =>
                                        this.newScreen('routesAdmin')
                                    },
                                  ],
                                  { cancelable: false }
                                );
                              }
                        } else if (responseJson.statusCode === '401'){
                          alert('Login FAILED ' + responseJson.statusCode + ' ' + responseJson.statusMessage);
                          }
                          else if (responseJson.status === '400'){
                            alert(responseJson.status + ' ' + responseJson.error)
                          }
                    })
      } else {
        alert('PLEASE ENTER YOUR PASSWORD');
      }
    } else {
      alert('PLEASE ENTER YOUR USERNAME');
    }
  };  
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