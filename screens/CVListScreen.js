import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, ListView, View, ScrollView, Image, TouchableOpacity, BackHandler, ToastAndroid, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Navigation } from 'react-native-navigation';
import { Card, Button, Icon } from 'react-native-elements'
//import ActionButton from 'react-native-circular-action-menu';
import ActionButton from 'react-native-action-button';
import IconVector from 'react-native-vector-icons/Ionicons';

export default class CVListScreen extends Component {
  constructor() {
    super();
    this.backButtonListener = null;
    this.lastBackButtonPress = null;
    this.state = {
      isLoading: true,
      dataSource: [],
      dataSource1: [],
      refreshing: false,
    };
  }

  async componentDidMount() {
    tokenAsync = await AsyncStorage.getItem('token');
    let resumes = [];
    console.log(tokenAsync);

    return fetch('http://www.digital-resume-portfolio.pl/resumes', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.statusCode);
        if (responseJson.statusCode === '200') {
          this.setState({
            isLoading: false,
            dataSource: responseJson.resumes,
          })
        }
      })
      .catch((error) => {
        console.log(error)
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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container1, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.toolbar}>
            <Text style={styles.textTab}>Resumes</Text>
            <TouchableOpacity style={styles.buttonExportPdf}>
              <AntDesign style={styles.iconAddResumes} name={'pluscircleo'} size={35} color={'white'} />
            </TouchableOpacity>
          </View>

          <View>

            <FlatList
              data={this.state.dataSource}
              extraData={this.state}
              renderItem={({ item }) => <Card
                title={item.name}
                image={require('../img/resumes.jpg')}>
                <Text style={{ marginBottom: 10 }}>
                  {item.description}
                </Text>
                <Button
                  icon={<Icon name='code' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                  title='VIEW NOW' />
              </Card>}
            />

          </View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconAddResumes: {
    marginTop: 12,
    paddingLeft: 40,
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
    marginBottom: 10,
    paddingLeft: 30 + "%",
  },
});