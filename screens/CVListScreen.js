import React, { Component } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, FlatList, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Button, Card, Icon, Input } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';
import { Navigation } from 'react-native-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Mybutton from './components/Mybutton';

export default class CVListScreen extends Component {
  constructor() {
    super();
    this.backButtonListener = null;
    this.lastBackButtonPress = null;
    this.state = {
      isLoading: true,
      dataSource: [],
      name: '',
      description: '',
      summary:'',
      githubLink:'',
      linkedInLink:'',
      modalVisible: false,
    };
  }

  async componentDidMount() {
    tokenAsync = await AsyncStorage.getItem('token');
    console.log(tokenAsync);
    return fetch('http://www.server-digital-resume-portfolio.pl/resumes', {
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
        console.log(this.state.dataSource)
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

  addResume = () => {
    onClose = () => this.setState({ modalVisible: false });
    console.log('token' + tokenAsync)
    fetch('http://www.server-digital-resume-portfolio.pl/resume', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        summary:this.summary,
        githubLink:this.githubLink,
        linkedInLink:this.linkedInLink,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.statusCode === '200') {
          this.componentDidMount(),
            ToastAndroid.show('Add new Resumes :)', ToastAndroid.SHORT);
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  onClose = () => this.setState({ modalVisible: false });

  alertAddResume = () => this.setState({ modalVisible: true });

  onClick(event) {
    this.onClose();
    this.addResume();
  }

  handlerLongClick = (value) => {
    AsyncStorage.setItem('resumeID', String (value));
    Alert.alert(
      'Delete Resume',
      'Are you sure ? ',
      [
        {
          text: 'Delete',
          onPress: () =>
            this.deleteResume(value)
        },
        {
          text: 'Modify',
          onPress: () =>
            this.newScreen('CVModifyScreen')
        },
      ],
      { cancelable: true }
    );
  };

  deleteResume = (value) => {
    fetch('http://www.server-digital-resume-portfolio.pl/resume?id=' + value, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.statusCode === '200') {
          this.componentDidMount(),
            ToastAndroid.show('Delete Resume :)', ToastAndroid.SHORT);
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });

  }

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
            <TouchableOpacity style={styles.buttonExportPdf} onPress={this.alertAddResume.bind(this)}>
              <AntDesign style={styles.iconAddResumes} name={'pluscircleo'} size={35} color={'white'} />
            </TouchableOpacity>
          </View>

          <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Name of your new Resume</Text>
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderLeftWidth: 0,
                  width: (80 + "%"),
                  height: 50,
                  backgroundColor: 'white',
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                containerStyle={{ paddingHorizontal: 0 }}
                leftIcon={<SimpleIcon name="lock" color="black" size={25} />}
                placeholder="Name of Resume"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(name) => this.setState({ name })}
              />
              <View style={styles.triangleRight} />

              <View style={styles.triangleLeft} />
              <Text>Enter Description about your new Resume</Text>
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderLeftWidth: 0,
                  width: (80 + "%"),
                  height: 50,
                  backgroundColor: 'white',
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                containerStyle={{ paddingHorizontal: 0 }}
                leftIcon={<SimpleIcon name="lock" color="black" size={25} />}
                placeholder="Description"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(description) => this.setState({ description })}
              />
              <View style={styles.triangleRight} />

              <View style={styles.triangleLeft} />
              <Text>Enter Summary about your new Resume</Text>
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderLeftWidth: 0,
                  width: (80 + "%"),
                  height: 50,
                  backgroundColor: 'white',
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                containerStyle={{ paddingHorizontal: 0 }}
                leftIcon={<SimpleIcon name="lock" color="black" size={25} />}
                placeholder="Summary"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(summary) => this.setState({ summary })}
              />
              <View style={styles.triangleRight} />

              <View style={styles.triangleLeft} />
              <Text>Enter github Link about your new Resume</Text>
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderLeftWidth: 0,
                  width: (80 + "%"),
                  height: 50,
                  backgroundColor: 'white',
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                containerStyle={{ paddingHorizontal: 0 }}
                leftIcon={<SimpleIcon name="lock" color="black" size={25} />}
                placeholder="Github Link"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(githubLink) => this.setState({ githubLink })}
              />
              <View style={styles.triangleRight} />

              <View style={styles.triangleLeft} />
              <Text>Enter linkedIn Link about your new Resume</Text>
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderLeftWidth: 0,
                  width: (80 + "%"),
                  height: 50,
                  backgroundColor: 'white',
                }}
                leftIconContainerStyle={{
                  marginRight: 10,
                }}
                containerStyle={{ paddingHorizontal: 0 }}
                leftIcon={<SimpleIcon name="lock" color="black" size={25} />}
                placeholder="LinkedIn Link"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(linkedInLink) => this.setState({ linkedInLink })}
              />
              <View style={styles.triangleRight} />


            </View>
            <Mybutton
              title="Add Resume"
              customClick={this.onClick.bind(this)}
            />
          </Overlay>

          <View>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onLongPress={() => this.handlerLongClick(item.id)}
                  activeOpacity={0.6}>
                  <Card
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
                  </Card>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index}
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
  triangleLeft: {
    position: 'absolute',
    left: -20,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  triangleRight: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
});