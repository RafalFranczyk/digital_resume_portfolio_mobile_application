import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { Card } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import IconButton from 'react-native-vector-icons/Ionicons';


export default class CVModifyScreen extends Component {
  constructor() {
    super();
    this.backButtonListener = null;
    this.lastBackButtonPress = null;
    this.state = {
      isLoading: true,
      dataSource: [],
      dataCourses: [],
      dataEducations: [],
      dataHobbies: [],
      dataLanguages: [],
      dataWorkExpieriences: [],
      dataSkills: [],
      name: '',
      description: '',
      summary: '',
      githubLink: '',
      linkedInLink: '',
    };
  }

  async componentDidMount() {
    tokenAsync = await AsyncStorage.getItem('token');
    resumeID = await AsyncStorage.getItem('resumeID');
    console.log(tokenAsync);
    console.log(resumeID);
    return fetch('http://www.server-digital-resume-portfolio.pl/resume?id=' + resumeID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.statusCode);
        console.log(responseJson.resume);
        if (responseJson.statusCode === '200') {
          this.setState({
            isLoading: false,
            dataSource: responseJson.resume,
            dataCourses: responseJson.resume.resumeCourses,
            dataEducations: responseJson.resume.resumeEducations,
            dataHobbies: responseJson.resume.resumeHobbies,
            dataLanguages: responseJson.resume.resumeLanguages,
            //dataWorkExpieriences : responseJson.resume.resumeExperiences,
            //dataSkills : responseJson.resume.resumeSkills,
          })
        }
        console.log([this.state.dataSource])
        console.log(this.state.dataCourses)
        console.log(this.state.dataEducations)
        console.log(this.state.dataHobbies)
        console.log(this.state.dataLanguages)
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


  backToResumes = () => {
    AsyncStorage.removeItem('resumeID');
    this.newScreen('CVListScreen');
  }



  deleteCourse = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumecourse?id=' + courseID + '&resumeId=' + resumeID, {
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

  handlerLongClickCourses = (courseID) => {
    Alert.alert(
      'Delete Course',
      'Are you sure ? ',
      [
        {
          text: 'Delete',
          onPress: () =>
            this.deleteCourse(courseID)
        },
      ],
      { cancelable: true }
    );
  }

  deleteEducations = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumeeducation?id=' + courseID + '&resumeId=' + resumeID, {
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
            ToastAndroid.show('Delete Section Education :)', ToastAndroid.SHORT);
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  handlerLongClickEducation = (courseID) => {
    Alert.alert(
      'Delete Education',
      'Are you sure ? ',
      [
        {
          text: 'Delete',
          onPress: () =>
            this.deleteEducations(courseID)
        },
      ],
      { cancelable: true }
    );
  }

  deleteHobbies = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumehobby?id=' + courseID + '&resumeId=' + resumeID, {
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
            ToastAndroid.show('Delete Section Education :)', ToastAndroid.SHORT);
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  handlerLongClickHobbies = (courseID) => {
    Alert.alert(
      'Delete Hobbies',
      'Are you sure ? ',
      [
        {
          text: 'Delete',
          onPress: () =>
            this.deleteHobbies(courseID)
        },
      ],
      { cancelable: true }
    );
  }

  deleteSkills = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumeskill?id=' + courseID + '&resumeId=' + resumeID, {
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
            ToastAndroid.show('Delete Section Education :)', ToastAndroid.SHORT);
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  handlerLongClickSkills = (courseID) => {
    Alert.alert(
      'Delete Skills',
      'Are you sure ? ',
      [
        {
          text: 'Delete',
          onPress: () =>
            this.deleteSkills(courseID)
        },
      ],
      { cancelable: true }
    );
  }

  deleteLanguage = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumelanguage?id=' + courseID + '&resumeId=' + resumeID, {
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
            ToastAndroid.show('Delete Section Education :)', ToastAndroid.SHORT);
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  handlerLongClickLanguage = (courseID) => {
    Alert.alert(
      'Delete Language',
      'Are you sure ? ',
      [
        {
          text: 'Delete',
          onPress: () =>
            this.deleteLanguage(courseID)
        },
      ],
      { cancelable: true }
    );
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
            <TouchableOpacity style={styles.buttonBackLeft} onPress={this.backToResumes.bind(this)}>
              <AntDesign style={styles.iconLogout} name={'arrowleft'} size={25} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.textTab}>Modify Resume</Text>
            <TouchableOpacity style={styles.buttonExportPdf}>
              <Foundation style={styles.iconLogout} name={'page-export-pdf'} size={25} color={'white'} />
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={[this.state.dataSource]}
              renderItem={({ item }) =>
                <TouchableOpacity>
                  <Card
                    title="Resume Details">
                    <Text style={{ marginBottom: 10 }}>
                      Name : {item.name}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Description : {item.description}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Summary : {item.summary}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Github Link : {item.githubLink}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      LinkedIn Link : {item.linkedInLink}
                    </Text>
                  </Card>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View>
            <FlatList
              data={this.state.dataCourses}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onLongPress={() => this.handlerLongClickCourses(item.id)}
                  activeOpacity={0.6}>
                  <Card
                    title="Courses">
                    <Text style={{ marginBottom: 10 }}>
                      Name : {item.name}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Start Date : {item.startDate}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      End Date : {item.endDate}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Description : {item.description}
                    </Text>
                  </Card>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View>
            <FlatList
              data={this.state.dataEducations}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onLongPress={() => this.handlerLongClickEducation(item.id)}
                  activeOpacity={0.6}>
                  <Card
                    title="Educations">
                    <Text style={{ marginBottom: 10 }}>
                      Title : {item.title}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Start Date : {item.startDate}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      End Date : {item.endDate}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      School Name : {item.schoolName}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Description : {item.description}
                    </Text>
                  </Card>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View>
            <FlatList
              data={this.state.dataSkills}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onLongPress={() => this.handlerLongClickSkills(item.id)}
                  activeOpacity={0.6}
                >
                  <Card
                    title="Skills">
                    <Text style={{ marginBottom: 10 }}>
                      Name : {item.name}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Level : {item.level}
                    </Text>
                  </Card>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View>
            <FlatList
              data={this.state.dataHobbies}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onLongPress={() => this.handlerLongClickHobbies(item.id)}
                  activeOpacity={0.6}>
                  <Card
                    title="Hobbies">
                    <Text style={{ marginBottom: 10 }}>
                      Name : {item.name}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Description : {item.description}
                    </Text>
                  </Card>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View>
            <FlatList
              data={this.state.dataLanguages}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onLongPress={() => this.handlerLongClickLanguage(item.id)}
                  activeOpacity={0.6}>
                  <Card
                    title="Languages">
                    <Text style={{ marginBottom: 10 }}>
                      Name : {item.name}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Level : {item.level}
                    </Text>
                  </Card>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View style={styles.ActionButton}>

            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                <Entypo name="language" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
                <IconButton name="ios-attach" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
                <IconButton name="ios-attach" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
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