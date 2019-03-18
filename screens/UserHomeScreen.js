import React, {Component} from 'react';
import {StyleSheet, Text, View,ScrollView, Image,TouchableOpacity,BackHandler,ToastAndroid} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

export default class UserHomeScreen extends Component {
  constructor() {
    super();
    this.backButtonListener = null;
    this.lastBackButtonPress = null;
    this.state = {
      isLoading : true,
      dataSource: null,
    }; 
}

componentDidMount() {
      this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
          if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
              BackHandler.exitApp();
              return true;
          }
          ToastAndroid.show('Click two times very fast to close the app :)', ToastAndroid.SHORT);
          this.lastBackButtonPress = new Date().getTime();
          return true;
      });
}

render() {
      return (
        <ScrollView style={styles.container}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.buttonLogout} >
              <SimpleLineIcons style={styles.iconLogout} name={'logout'} size={25} color={'white'}/>
          </TouchableOpacity>
          <Text style={styles.textTab}>Home Screen</Text>
          
        </View>

    <View style={{flexDirection: 'row',justifyContent: 'center'}}>	
		  <Image source={require('../img/userPicture.jpg')} style={{width: 100,height: 100,borderRadius: 50,marginTop:20}} />	
		</View>
        <View>
            <Text style={styles.welcome}>Hello User</Text>
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
  buttonLogout:{
    marginLeft:20,
    marginTop:12,
    paddingRight:40,
  },
  iconLogout:{
    fontSize: 36,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginTop:30,
  },
  toolbar: {
    backgroundColor: '#da2626',
    flexDirection:"row",
  },
  textTab: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
    textAlign:'center',
    justifyContent:'center',
    marginTop:10,
    marginBottom:10
  },
});