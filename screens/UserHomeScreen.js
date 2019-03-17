import React, {Component} from 'react';
import {StyleSheet, Text, View,ScrollView, Image} from 'react-native';
import {Navigation} from 'react-native-navigation';


export default class HomePageUser extends Component {
  constructor() {
    super();
    this.state = {
      isLoading : true,
      dataSource: null,
    }; 
}

newScreen = (screen) => {
  Navigation.mergeOptions('drawerId', {
      sideMenu: {
          left: {
              visible: false
          }
      }
  });

  Navigation.setStackRoot('MAIN_STACK',{
      component: {
          name: screen
      }
  })
};
  render() {
      return (
        <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row',justifyContent: 'center'}}>	
		<Image source={{uri:'http://lorempixel.com/100/100/'}} style={{width: 100,height: 100,borderRadius: 50,marginTop:20}} />	
		</View>
        <View>
            <Text style={styles.welcome}>Witaj</Text>
        </View> 

        </ScrollView>
      );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginTop:30,
  },
  loginIcon:{
    marginTop: 10,
    alignSelf: 'center'
  },
});