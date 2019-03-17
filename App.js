import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, StatusBar} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {Navigation} from 'react-native-navigation';

export default class App extends Component {
  constructor() {
    super()

    this.state = {};
}
async componentDidMount() {
    SplashScreen.hide();
};

newScreen = (window) => {
  Navigation.push(this.props.componentId, {
      component: {
          name: window
      }
  });
};

render() {
  return (
<View style={styles.container}>
    <StatusBar
      backgroundColor="#da2626"
      barStyle="light-content"
    />
 
    <View>
      <Image style={styles.imageStyle} source={require('./img/logo.png')} />
    </View>

    <Text style={styles.welcome}>Welcome to Portfolio</Text>
    <Text style={styles.fontsroboto}>Log in to create a CV or put your files on the server. </Text>
        <Text></Text>
        <Text></Text>
          <TouchableOpacity  style={styles.button} onPress={() => this.newScreen('Login')}>
                      <Text style={styles.textButton} >Log in</Text>
          </TouchableOpacity>
        <Text></Text>
          <TouchableOpacity  style={styles.button} onPress={() => this.newScreen('Registration')}>
                      <Text style={styles.textButton} >Register</Text>
          </TouchableOpacity>
  </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f6d7a',
  },
  welcome: {
    fontSize: 26,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  fontsroboto:{
    fontFamily: 'Roboto-Regular',
    color: '#ffffff',
    fontSize: 17,
    marginLeft: 30,
  },
  button:{
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 10,
    height: 50,
    width: 350,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: '#ffffff',
},

  textButton:{
  fontSize: 20,
  color: '#da2626',
  fontWeight: 'bold',
},

  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
  },
});
