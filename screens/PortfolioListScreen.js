import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import ActionButton from 'react-native-circular-action-menu';
import ActionButton from 'react-native-action-button';
import { Button, Card, Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class PortfolioListScreen extends Component {
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
          <Text style={styles.textTab}>Portfolio</Text>
          <TouchableOpacity style={styles.buttonExportPdf}>
            <AntDesign style={styles.iconAddResumes} name={'pluscircleo'} size={35} color={'white'} />
          </TouchableOpacity>
        </View>
        <View>

          <Card
            title='Summer Album'
            image={require('../img/summer.jpg')}>
            <Text style={{ marginBottom: 10 }}>
              Last holidays in Greece June 2018
                </Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='VIEW NOW' />
          </Card>

          <Card
            title='Music Album'
            image={require('../img/music.jpg')}>
            <Text style={{ marginBottom: 10 }}>
              The best music tracks last summer
                </Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='VIEW NOW' />
          </Card>


        </View>
        <ActionButton
          active={true}
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { console.log("hi") }}
        />
      </ScrollView>
    );
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