import React, { Component } from 'react';
import { AsyncStorage, BackHandler, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


export default class UserHomeScreen extends Component {
  constructor() {
    super();
    this.backButtonListener = null;
    this.lastBackButtonPress = null;
    this.state = {
      isLoading: true,
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

  newScreen = (screen) => {
    Navigation.mergeOptions('drawerId', {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });

    Navigation.setStackRoot('MAIN_STACK', {
      component: {
        name: screen
      }
    })
  };

  logout = () => {
    AsyncStorage.removeItem('token'),
      AsyncStorage.removeItem('role'),
      AsyncStorage.removeItem('email'),
      this.newScreen('App');
    ToastAndroid.show('Logout :)', ToastAndroid.SHORT)
  };

  sectionProfileUpdate = () => {
    this.newScreen('UpdateProfileScreen');
    ToastAndroid.show('go do it  :)', ToastAndroid.SHORT)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.buttonLogoutLeft} onPress={this.logout.bind(this)}>
            <SimpleLineIcons style={styles.iconLogout} name={'logout'} size={25} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.textTab}>Home Screen</Text>
          <TouchableOpacity style={styles.buttonLogoutRight} onPress={this.sectionProfileUpdate.bind(this)}>
            <AntDesign style={styles.iconLogout} name={'edit'} size={25} color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={require('../img/userPicture.jpg')} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }} />
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
  buttonLogoutLeft: {
    marginLeft: 20,
    marginTop: 12,
    paddingRight: 40,
  },
  buttonLogoutRight: {
    marginTop: 12,
    paddingLeft: 30,
    marginRight: 20,
  },
  iconLogout: {
    fontSize: 36,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginTop: 30,
  },
  toolbar: {
    backgroundColor: '#da2626',
    flexDirection: 'row',
  },
  textTab: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
});