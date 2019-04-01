import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { Card } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';


export default class CVModifyScreen extends Component {
  constructor() {
    super();
    this.backButtonListener = null;
    this.lastBackButtonPress = null;
    this.state = {
      isLoading: true,
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

    Navigation.setStackRoot('MAIN_STACK', {
      component: {
        name: screen
      }
    })
  };


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.buttonBackLeft}>
            <AntDesign style={styles.iconLogout} name={'arrowleft'} size={25} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.textTab}>Modify Resume</Text>
          <TouchableOpacity style={styles.buttonExportPdf}>
            <Foundation style={styles.iconLogout} name={'page-export-pdf'} size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.CardView}>
          <Card title='Title of CV'>
            <Text style={{ marginBottom: 10 }}>
              JUNIOR JAVA
                </Text>
          </Card>
          <Card title='Description'>
            <Text style={{ marginBottom: 10 }}>
              Description about resume. Example . this is resume for Java Programmer
                </Text>
          </Card>

          <Card title='Hobby'>
            <Text style={{ marginBottom: 10 }}>
              Gyms
                </Text>
            <Text style={{ marginBottom: 10 }}>
              Swimming
                </Text>
            <Text style={{ marginBottom: 10 }}>
              Reading books
                </Text>
            <Text style={{ marginBottom: 10 }}>
              Watching Films
                </Text>
          </Card>

          <Card title='Language'>
            <Text style={{ marginBottom: 10 }}>
              Polish - native speaker;
                </Text>
            <Text style={{ marginBottom: 10 }}>
              English - native speaker;
                </Text>
          </Card>
        </View>

        <View style={styles.ActionButton}>

          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
              <Entypo name="language" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
              <Icon name="ios-attach" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
              <Icon name="ios-attach" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>

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

  CardView: {
    zIndex: 0,
  },
  ActionButton: {
    paddingTop: 50,
    paddingTop: 100,
    zIndex: 1,
    position: 'relative',
    right: 0,
    bottom: 0,
  },


  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  buttonBackLeft: {
    marginLeft: 20,
    marginTop: 12,
    paddingRight: 30,
  },
  buttonExportPdf: {
    marginTop: 12,
    paddingLeft: 20,
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