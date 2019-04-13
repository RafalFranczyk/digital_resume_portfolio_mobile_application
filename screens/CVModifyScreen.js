import React, { Component } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, FlatList, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { Card, Input } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';
import { Navigation } from 'react-native-navigation';
import StarRating from 'react-native-star-rating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Mybutton from './components/Mybutton';

export default class CVModifyScreen extends Component {
  constructor() {
    super();
    this.backButtonListener = null;
    this.lastBackButtonPress = null;
    this.state = {
      modalVisibleCourse: false,
      modalVisibleEducation: false,
      modalVisibleHobby: false,
      modalVisibleLanguage: false,
      modalVisibleSkill: false,
      modalVisibleWorkExpierience: false,
      modalVisibleLanguageUpdate: false,
      modalVisibleHobbyUpdate: false,
      modalVisibleEducationUpdate: false,
      modalVisibleWorkExperienceUpdate: false,
      toPresent: false,
      isLoading: true,
      workExperiencePresent: false,
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
      educationStartDate: '',
      educationEndDate: '',
      educationToPresent: '',
      educationSchoolName: '',
      educationTitle: '',
      educationDescription: '',
      hobbyName: '',
      hobbyDescription: '',
      languageName: '',
      languageLevel: 1.0,
      courseName: '',
      courseStartDate: '',
      courseEndDate: '',
      courseToPresent: false,
      courseDescription: '',
      skillName: '',
      skillLevel: 1.0,
      workStartDate: '',
      workEndDate: '',
      workCompanyName: '',
      workTitle: '',
      workDescription: '',
      getNameLanguage: '',
      getLevelLanguage: 0.0,
      languageId: 0,
      getDescriptionHobby: '',
      getNameHobby: '',
      hobbyId: 0,
      getNameSkill: '',
      getLevelSkill: 0,
      skillId: 0,
      getNameCourse: '',
      getDescriptionCourse: '',
      getEndDateCourse: '',
      getStartDateCourse: '',
      getCourseId: 0,
      getEducationStartDate: '',
      getEducationEndDate: '',
      getEducationSchoolName: '',
      getEducationTitle: '',
      getEducationDescription: '',
      educationId: 0,
      getWorkExperienceStartDate: '',
      getWorkExperienceEndDate: '',
      getWorkExperienceCompanyName: '',
      getWorkExperienceWorkTitle: '',
      getWorkExperienceWorkDescription: '',
      workExperienceId: 0,
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
            dataWorkExpieriences: responseJson.resume.resumeWorkExperiences,
            dataSkills: responseJson.resume.resumeSkills,
          })
        }
        console.log([this.state.dataSource])
        console.log(this.state.dataCourses)
        console.log(this.state.dataEducations)
        console.log(this.state.dataHobbies)
        console.log(this.state.dataLanguages)
        console.log(this.state.dataSkills)
        console.log(this.state.dataWorkExpieriences)
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
    this.newScreen('UserNavigationScreen');
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
            ToastAndroid.show('Delete Section Course :)', ToastAndroid.SHORT);
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
        {
          text: 'Modify',
          onPress: () =>
            this.getCourse(courseID)
        }
      ],
      { cancelable: true }
    );
  }

  getCourse = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumecourse?id=' + courseID + '&resumeId=' + resumeID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.statusCode === '200') {
          this.setState({
            getNameCourse: responseJson.resumeCourse.name,
            getDescriptionCourse: responseJson.resumeCourse.description,
            getStartDateCourse: responseJson.resumeCourse.startDate,
            getEndDateCourse: responseJson.resumeCourse.endDate,
            getCourseId: courseID,
            modalVisibleCourseUpdate: true,
          })

        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  modifyCourse = () => {
    const { getStartDateCourse } = this.state;
    const { getEndDateCourse } = this.state;
    const { getNameCourse } = this.state;
    const { getDescriptionCourse } = this.state;
    if (getStartDateCourse) {
      if (getEndDateCourse) {
        if (getNameCourse) {
          if (getDescriptionCourse) {
            return fetch('http://www.server-digital-resume-portfolio.pl/resumecourse?id=' + Number(this.state.getCourseId), {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenAsync
              },
              body: JSON.stringify({
                name: this.state.getNameCourse,
                startDate: this.state.getStartDateCourse,
                endDate: this.state.getEndDateCourse,
                toPresent: this.state.courseToPresent,
                description: this.state.getDescriptionCourse,
                resumeId: Number(resumeID)
              })
            }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.statusCode === '200') {
                  this.setState({
                    modalVisibleCourseUpdate: false,
                  })
                  this.componentDidMount(),
                    ToastAndroid.show('Modify Hobby Section :)', ToastAndroid.SHORT);
                } else if (responseJson.status === '500') {
                  ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                }
              })
              .catch((error) => {
                console.log(error)
              });
          } else { ToastAndroid.show('Enter Description', ToastAndroid.SHORT); }
        } else { ToastAndroid.show('Enter Course Name', ToastAndroid.SHORT); }
      } else { ToastAndroid.show('Enter End Date yyyy-mm-dd', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Start Date yyyy-mm-dd', ToastAndroid.SHORT); }
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
        {
          text: 'Modify',
          onPress: () =>
            this.getEducation(courseID)
        }
      ],
      { cancelable: true }
    );
  }

  getEducation = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumeeducation?id=' + courseID + '&resumeId=' + resumeID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.statusCode === '200') {
          this.setState({
            getEducationStartDate: responseJson.resumeEducation.startDate,
            getEducationEndDate: responseJson.resumeEducation.endDate,
            getEducationSchoolName: responseJson.resumeEducation.schoolName,
            getEducationTitle: responseJson.resumeEducation.title,
            getEducationDescription: responseJson.resumeEducation.description,
            educationId: courseID,
            modalVisibleEducationUpdate: true,
          })
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  modifyEducation = () => {
    const { getEducationStartDate } = this.state;
    const { getEducationEndDate } = this.state;
    const { getEducationSchoolName } = this.state;
    const { getEducationTitle } = this.state;
    const { getEducationDescription } = this.state;
    if (getEducationStartDate) {
      if (getEducationEndDate) {
        if (getEducationSchoolName) {
          if (getEducationTitle) {
            if (getEducationDescription) {
              return fetch('http://www.server-digital-resume-portfolio.pl/resumeeducation?id=' + Number(this.state.educationId), {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + tokenAsync
                },
                body: JSON.stringify({
                  startDate: this.state.getEducationStartDate,
                  endDate: this.state.getEducationEndDate,
                  toPresent: this.state.educationToPresent,
                  schoolName: this.state.getEducationSchoolName,
                  title: this.state.getEducationTitle,
                  description: this.state.getEducationDescription,
                  resumeId: Number(resumeID)
                })
              }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson);
                  if (responseJson.statusCode === '200') {
                    this.setState({
                      modalVisibleEducationUpdate: false,
                    })
                    this.componentDidMount(),
                      ToastAndroid.show('Modify Language Section :)', ToastAndroid.SHORT);
                  } else if (responseJson.status === '500') {
                    ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                  }
                })
                .catch((error) => {
                  console.log(error)
                });
            } else { ToastAndroid.show('Enter Description', ToastAndroid.SHORT); }
          } else { ToastAndroid.show('Enter Title Degree', ToastAndroid.SHORT); }
        } else { ToastAndroid.show('Enter School Name', ToastAndroid.SHORT); }
      } else { ToastAndroid.show('Enter End Date yyyy-mm-dd', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Start Date yyyy-mm-dd', ToastAndroid.SHORT); }
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
            ToastAndroid.show('Delete Section Hobby :)', ToastAndroid.SHORT);
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
        {
          text: 'Modify',
          onPress: () =>
            this.getHobby(courseID)
        }
      ],
      { cancelable: true }
    );
  }

  getHobby = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumehobby?id=' + courseID + '&resumeId=' + resumeID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.statusCode === '200') {
          this.setState({
            getNameHobby: responseJson.resumeHobby.name,
            getDescriptionHobby: responseJson.resumeHobby.description,
            hobbyId: courseID,
            modalVisibleHobbyUpdate: true,
          })

        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  modifyHobby = () => {
    const { getNameHobby } = this.state;
    const { getDescriptionHobby } = this.state;
    if (getNameHobby) {
      if (getDescriptionHobby) {
        return fetch('http://www.server-digital-resume-portfolio.pl/resumehobby?id=' + Number(this.state.hobbyId), {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenAsync
          },
          body: JSON.stringify({
            name: this.state.getNameHobby,
            description: this.state.getDescriptionHobby,
            resumeId: Number(resumeID)
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.statusCode === '200') {
              this.setState({
                modalVisibleHobbyUpdate: false,
              })
              this.componentDidMount(),
                ToastAndroid.show('Modify Hobby Section :)', ToastAndroid.SHORT);
            } else if (responseJson.status === '500') {
              ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.log(error)
          });
      } else { ToastAndroid.show('Enter Description', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Hobby Name', ToastAndroid.SHORT); }
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
            ToastAndroid.show('Delete Section Skills :)', ToastAndroid.SHORT);
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
        {
          text: 'Modify',
          onPress: () =>
            this.getSkill(courseID)
        }
      ],
      { cancelable: true }
    );
  }

  getSkill = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumeskill?id=' + courseID + '&resumeId=' + resumeID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.statusCode === '200') {
          this.setState({
            getNameSkill: responseJson.resumeSkill.name,
            getLevelSkill: responseJson.resumeSkill.level,
            skillId: courseID,
            modalVisibleSkillUpdate: true,
          })

        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  modifySkill = () => {
    const { getNameSkill } = this.state;
    const { getLevelSkill } = this.state;
    if (getNameSkill) {
      if (getLevelSkill) {
        return fetch('http://www.server-digital-resume-portfolio.pl/resumeskill?id=' + Number(this.state.skillId), {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenAsync
          },
          body: JSON.stringify({
            name: this.state.getNameSkill,
            level: this.state.getLevelSkill,
            resumeId: Number(resumeID)
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.statusCode === '200') {
              this.setState({
                modalVisibleSkillUpdate: false,
              })
              this.componentDidMount(),
                ToastAndroid.show('Modify Skill Section :)', ToastAndroid.SHORT);
            } else if (responseJson.status === '500') {
              ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.log(error)
          });
      } else { ToastAndroid.show('Enter Skill Level', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Skill Name', ToastAndroid.SHORT); }
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
            ToastAndroid.show('Delete Section Language :)', ToastAndroid.SHORT);
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
        {
          text: 'Modify',
          onPress: () =>
            this.getLanguage(courseID)
        }
      ],
      { cancelable: true }
    );
  }

  getLanguage = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumelanguage?id=' + courseID + '&resumeId=' + resumeID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.statusCode === '200') {
          this.setState({
            getNameLanguage: responseJson.resumeLanguage.name,
            getLevelLanguage: responseJson.resumeLanguage.level,
            languageId: courseID,
            modalVisibleLanguageUpdate: true,
          })
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  modifyLanguage = () => {
    const { getNameLanguage } = this.state;
    const { getLevelLanguage } = this.state;
    if (getNameLanguage) {
      if (getLevelLanguage) {
        return fetch('http://www.server-digital-resume-portfolio.pl/resumelanguage?id=' + Number(this.state.languageId), {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenAsync
          },
          body: JSON.stringify({
            name: this.state.getNameLanguage,
            level: this.state.getLevelLanguage,
            resumeId: Number(resumeID)
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.statusCode === '200') {
              this.setState({
                modalVisibleLanguageUpdate: false,
              })
              this.componentDidMount(),
                ToastAndroid.show('Modify Language Section :)', ToastAndroid.SHORT);
            } else if (responseJson.status === '500') {
              ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.log(error)
          });
      } else { ToastAndroid.show('Enter Description', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Title Degree', ToastAndroid.SHORT); }
  }

  deleteWorkExperience = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumeworkexperience?id=' + courseID + '&resumeId=' + resumeID, {
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
            ToastAndroid.show('Delete Work Experience Section :)', ToastAndroid.SHORT);
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  handlerLongClickWorkExperience = (courseID) => {
    Alert.alert(
      'Delete Work Experience',
      'Are you sure ? ',
      [
        {
          text: 'Delete',
          onPress: () =>
            this.deleteWorkExperience(courseID)
        },
        {
          text: 'Modify',
          onPress: () =>
            this.getWorkExperience(courseID)
        }
      ],
      { cancelable: true }
    );
  }

  getWorkExperience = (courseID) => {
    return fetch('http://www.server-digital-resume-portfolio.pl/resumeworkexperience?id=' + courseID + '&resumeId=' + resumeID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(courseID);
        console.log(resumeID);
        console.log(responseJson);
        if (responseJson.statusCode === '200') {
          this.setState({
            getWorkExperienceStartDate: responseJson.resumeWorkExperience.startDate,
            getWorkExperienceEndDate: responseJson.resumeWorkExperience.endDate,
            getWorkExperienceCompanyName: responseJson.resumeWorkExperience.companyName,
            getWorkExperienceWorkTitle: responseJson.resumeWorkExperience.workTitle,
            getWorkExperienceWorkDescription: responseJson.resumeWorkExperience.workDescription,
            workExperienceId: courseID,
            modalVisibleWorkExperienceUpdate: true,
          })
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
        console.log(this.state.getWorkExperienceStartDate);
        console.log(this.state.getWorkExperienceEndDate);
        console.log(this.state.getWorkExperienceCompanyName);
        console.log(this.state.getWorkExperienceWorkTitle);
        console.log(this.state.getWorkExperienceWorkDescription);
        console.log(this.state.modalVisibleWorkExperienceUpdate);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  modifyWorkExperience = () => {
    const { getWorkExperienceStartDate } = this.state;
    const { getWorkExperienceEndDate } = this.state;
    const { getWorkExperienceCompanyName } = this.state;
    const { getWorkExperienceWorkTitle } = this.state;
    const { getWorkExperienceWorkDescription } = this.state;
    if (getWorkExperienceStartDate) {
      if (getWorkExperienceEndDate) {
        if (getWorkExperienceCompanyName) {
          if (getWorkExperienceWorkTitle) {
            if (getWorkExperienceWorkDescription) {
              return fetch('http://www.server-digital-resume-portfolio.pl/resumeworkexperience?id=' + Number(this.state.workExperienceId), {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + tokenAsync
                },
                body: JSON.stringify({
                  startDate: this.state.getWorkExperienceStartDate,
                  endDate: this.state.getWorkExperienceEndDate,
                  toPresent: this.state.workExperiencePresent,
                  companyName: this.state.getWorkExperienceCompanyName,
                  workTitle: this.state.getWorkExperienceWorkTitle,
                  workDescription: this.state.getWorkExperienceWorkDescription,
                  resumeId: Number(resumeID)
                })
              }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson);
                  if (responseJson.statusCode === '200') {
                    this.setState({
                      modalVisibleWorkExperienceUpdate: false,
                    })
                    this.componentDidMount(),
                      ToastAndroid.show('Modify Work Experience Section :)', ToastAndroid.SHORT);
                  } else if (responseJson.status === '500') {
                    ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                  }
                })
                .catch((error) => {
                  console.log(error)
                });
            } else { ToastAndroid.show('Enter Work Description', ToastAndroid.SHORT); }
          } else { ToastAndroid.show('Enter Work Title', ToastAndroid.SHORT); }
        } else { ToastAndroid.show('Enter Company Name', ToastAndroid.SHORT); }
      } else { ToastAndroid.show('Enter End Date', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Start Date', ToastAndroid.SHORT); }
  }

  addEducation = () => {
    const { educationStartDate } = this.state;
    const { educationEndDate } = this.state;
    const { educationSchoolName } = this.state;
    const { educationTitle } = this.state;
    const { educationDescription } = this.state;
    if (educationStartDate) {
      if (educationEndDate) {
        if (educationSchoolName) {
          if (educationTitle) {
            if (educationDescription) {
              fetch('http://www.server-digital-resume-portfolio.pl/resumeeducation', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + tokenAsync
                },
                body: JSON.stringify({
                  startDate: this.state.educationStartDate,
                  endDate: this.state.educationEndDate,
                  toPresent: this.state.educationToPresent,
                  schoolName: this.state.educationSchoolName,
                  title: this.state.educationTitle,
                  description: this.state.educationDescription,
                  resumeId: Number(resumeID)
                })
              }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson)
                  console.log(responseJson.statusCode)
                  console.log(tokenAsync)
                  if (responseJson.statusCode === '200') {
                    this.setState({
                      modalVisibleEducation: false
                    })
                    this.componentDidMount()
                    ToastAndroid.show("Add Education Section", ToastAndroid.SHORT)
                  } else if (responseJson.status === '400') {
                    ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT);
                  } else if (responseJson.statusCode === '409') {
                    ToastAndroid.show(responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
                  } else {
                    ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
                  }
                })
                .catch((error) => {
                  console.log(error)
                });
            } else { ToastAndroid.show('Enter Description', ToastAndroid.SHORT); }
          } else { ToastAndroid.show('Enter Title Degree', ToastAndroid.SHORT); }
        } else { ToastAndroid.show('Enter School Name', ToastAndroid.SHORT); }
      } else { ToastAndroid.show('Enter End Date yyyy-mm-dd', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Start Date yyyy-mm-dd', ToastAndroid.SHORT); }
  }

  addHobby = () => {
    const { hobbyName } = this.state;
    const { hobbyDescription } = this.state;
    if (hobbyName) {
      if (hobbyDescription) {
        fetch('http://www.server-digital-resume-portfolio.pl/resumehobby', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenAsync
          },
          body: JSON.stringify({
            name: this.state.hobbyName,
            description: this.state.hobbyDescription,
            resumeId: Number(resumeID)
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            console.log(responseJson.statusCode)
            console.log(tokenAsync)
            if (responseJson.statusCode === '200') {
              this.setState({
                modalVisibleHobby: false
              })
              this.componentDidMount()
              ToastAndroid.show("Add Hobby Section", ToastAndroid.SHORT)
            } else if (responseJson.status === '400') {
              ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT);
            } else if (responseJson.statusCode === '409') {
              ToastAndroid.show(responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
            } else {
              ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.log(error)
          });
      } else { ToastAndroid.show('Enter Description', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Hobby Name', ToastAndroid.SHORT); }
  }

  addLanguage = () => {
    const { languageName } = this.state;
    const { languageLevel } = this.state;

    if (languageName) {
      if (languageLevel) {
        fetch('http://www.server-digital-resume-portfolio.pl/resumelanguage', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenAsync
          },
          body: JSON.stringify({
            name: this.state.languageName,
            level: Number(this.state.languageLevel),
            resumeId: Number(resumeID)
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            console.log(responseJson.statusCode)
            console.log(tokenAsync)
            if (responseJson.statusCode === '200') {
              this.setState({
                modalVisibleLanguage: false
              })
              this.componentDidMount()
              ToastAndroid.show("Add Language Section", ToastAndroid.SHORT)
            } else if (responseJson.status === '400') {
              ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT);
            } else if (responseJson.statusCode === '409') {
              ToastAndroid.show(responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
            } else {
              ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.log(error)
          });
      } else { ToastAndroid.show('Enter Description', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Title Degree', ToastAndroid.SHORT); }
  }

  addCourse = () => {
    const { courseStartDate } = this.state;
    const { courseEndDate } = this.state;
    const { courseName } = this.state;
    const { courseDescription } = this.state;
    if (courseStartDate) {
      if (courseEndDate) {
        if (courseName) {
          if (courseDescription) {
            fetch('http://www.server-digital-resume-portfolio.pl/resumecourse', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenAsync
              },
              body: JSON.stringify({
                name: this.state.courseName,
                startDate: this.state.courseStartDate,
                endDate: this.state.courseEndDate,
                toPresent: this.state.courseToPresent,
                description: this.state.courseDescription,
                resumeId: Number(resumeID)
              })
            }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson)
                console.log(responseJson.statusCode)
                console.log(tokenAsync)
                if (responseJson.statusCode === '200') {
                  this.setState({
                    modalVisibleCourse: false
                  })
                  this.componentDidMount()
                  ToastAndroid.show("Add Course Section", ToastAndroid.SHORT)
                } else if (responseJson.status === '400') {
                  ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT);
                } else if (responseJson.statusCode === '409') {
                  ToastAndroid.show(responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
                } else {
                  ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
                }
              })
              .catch((error) => {
                console.log(error)
              });
          } else { ToastAndroid.show('Enter Description', ToastAndroid.SHORT); }
        } else { ToastAndroid.show('Enter Course Name', ToastAndroid.SHORT); }
      } else { ToastAndroid.show('Enter End Date yyyy-mm-dd', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Start Date yyyy-mm-dd', ToastAndroid.SHORT); }
  }

  addSkill = () => {
    const { skillName } = this.state;
    const { skillLevel } = this.state;
    if (skillName) {
      if (skillLevel) {
        fetch('http://www.server-digital-resume-portfolio.pl/resumeskill', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenAsync
          },
          body: JSON.stringify({
            name: this.state.skillName,
            level: Number(this.state.skillLevel),
            resumeId: Number(resumeID)
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            console.log(responseJson.statusCode)
            console.log(tokenAsync)
            if (responseJson.statusCode === '200') {
              this.setState({
                modalVisibleSkill: false
              })
              this.componentDidMount()
              ToastAndroid.show("Add Skill Section", ToastAndroid.SHORT)
            } else if (responseJson.status === '400') {
              ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT);
            } else if (responseJson.statusCode === '409') {
              ToastAndroid.show(responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
            } else {
              ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            console.log(error)
          });
      } else { ToastAndroid.show('Enter Skill Level', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Skill Name', ToastAndroid.SHORT); }
  }

  addWorkExperience = () => {
    const { workStartDate } = this.state;
    const { workEndDate } = this.state;
    const { workCompanyName } = this.state;
    const { workTitle } = this.state;
    const { workDescription } = this.state;
    if (workStartDate) {
      if (workEndDate) {
        if (workCompanyName) {
          if (workTitle) {
            if (workDescription) {
              fetch('http://www.server-digital-resume-portfolio.pl/resumeworkexperience', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + tokenAsync
                },
                body: JSON.stringify({
                  startDate: this.state.workStartDate,
                  endDate: this.state.workEndDate,
                  toPresent: false,
                  companyName: this.state.workCompanyName,
                  workTitle: this.state.workTitle,
                  workDescription: this.state.workDescription,
                  resumeId: Number(resumeID)
                })
              }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson)
                  console.log(responseJson.statusCode)
                  console.log(tokenAsync)
                  if (responseJson.statusCode === '200') {
                    this.setState({
                      modalVisibleWorkExpierience: false
                    })
                    this.componentDidMount()
                    ToastAndroid.show("Add Work Experience Section", ToastAndroid.SHORT)
                  } else if (responseJson.status === '400') {
                    ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT);
                  } else if (responseJson.statusCode === '409') {
                    ToastAndroid.show(responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
                  } else {
                    ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
                  }
                })
                .catch((error) => {
                  console.log(error)
                });
            } else { ToastAndroid.show('Enter Work Description', ToastAndroid.SHORT); }
          } else { ToastAndroid.show('Enter Work Title', ToastAndroid.SHORT); }
        } else { ToastAndroid.show('Enter Company Name', ToastAndroid.SHORT); }
      } else { ToastAndroid.show('Enter End Date', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Enter Start Date', ToastAndroid.SHORT); }
  }

  onCloseEducation = () => this.setState({ modalVisibleEducation: false });
  onCloseWorkExpierience = () => this.setState({ modalVisibleWorkExpierience: false });
  onCloseCourse = () => this.setState({ modalVisibleCourse: false });
  onCloseHobby = () => this.setState({ modalVisibleHobby: false });
  onCloseLanguage = () => this.setState({ modalVisibleLanguage: false });
  onCloseSkill = () => this.setState({ modalVisibleSkill: false });
  onCloseLanguageUpdate = () => this.setState({ modalVisibleLanguageUpdate: false });
  onCloseHobbyUpdate = () => this.setState({ modalVisibleHobbyUpdate: false });
  onCloseSkillUpdate = () => this.setState({ modalVisibleSkillUpdate: false })
  onCloseCourseUpdate = () => this.setState({ modalVisibleCourseUpdate: false })
  onCloseEducationUpdate = () => this.setState({ modalVisibleEducationUpdate: false })
  onCloseWorkExperienceUpdate = () => this.setState({ modalVisibleWorkExperienceUpdate: false })



  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container1, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else
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
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View>
            <FlatList
              data={this.state.dataWorkExpieriences}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onLongPress={() => this.handlerLongClickWorkExperience(item.id)}
                  activeOpacity={0.6}>
                  <Card
                    title="Resume Work Experience">
                    <Text style={{ marginBottom: 10 }}>
                      Work Title : {item.workTitle}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Company : {item.companyName}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Description : {item.workDescription}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Start Date : {item.startDate}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      End Date : {item.endDate}
                    </Text>
                  </Card>
                </TouchableOpacity>}
              keyExtractor={(item, index) => index.toString()}
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
              keyExtractor={(item, index) => index.toString()}
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
              keyExtractor={(item, index) => index.toString()}
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
              keyExtractor={(item, index) => index.toString()}
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
              keyExtractor={(item, index) => index.toString()}
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
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          {/* Modal Education */}

          <Overlay visible={this.state.modalVisibleEducation} onClose={this.onCloseEducation} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter School Name</Text>
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
                placeholder="School Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(educationSchoolName) => this.setState({ educationSchoolName })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Start Date </Text>
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
                placeholder="Start Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(educationStartDate) => this.setState({ educationStartDate })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter End Date </Text>
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
                placeholder="End Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(educationEndDate) => this.setState({ educationEndDate })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Title Degree </Text>
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
                placeholder="Title Degree"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(educationTitle) => this.setState({ educationTitle })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Description </Text>
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
                onChangeText={(educationDescription) => this.setState({ educationDescription })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Add Education"
              customClick={this.addEducation.bind(this)}
            />
          </Overlay>

          { /* Hobby Modal */}

          <Overlay visible={this.state.modalVisibleHobby} onClose={this.onCloseHobby} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Hobby name</Text>
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
                placeholder="Hobby Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(hobbyName) => this.setState({ hobbyName })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Hobby Description </Text>
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
                placeholder="Hobby Description"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(hobbyDescription) => this.setState({ hobbyDescription })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Add Hobby"
              customClick={this.addHobby.bind(this)}
            />
          </Overlay>

          { /* Language Modal */}

          <Overlay visible={this.state.modalVisibleLanguage} onClose={this.onCloseLanguage} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Language name</Text>
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
                placeholder="Hobby Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(languageName) => this.setState({ languageName })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Language Level </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.languageLevel}
                selectedStar={(languageLevel) => this.setState({ languageLevel })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Add Language"
              customClick={this.addLanguage.bind(this)}
            />
          </Overlay>

          {/* Modal Course */}


          <Overlay visible={this.state.modalVisibleCourse} onClose={this.onCloseCourse} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Course Name</Text>
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
                placeholder="Course Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(courseName) => this.setState({ courseName })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Start Date </Text>
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
                placeholder="Start Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(courseStartDate) => this.setState({ courseStartDate })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter End Date </Text>
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
                placeholder="End Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(courseEndDate) => this.setState({ courseEndDate })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Description </Text>
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
                onChangeText={(courseDescription) => this.setState({ courseDescription })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Add Course"
              customClick={this.addCourse.bind(this)}
            />
          </Overlay>

          { /* Skill Modal */}

          <Overlay visible={this.state.modalVisibleSkill} onClose={this.onCloseSkill} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Skill name</Text>
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
                placeholder="Skill Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(skillName) => this.setState({ skillName })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Skill Level </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.skillLevel}
                selectedStar={(skillLevel) => this.setState({ skillLevel })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Add Skill"
              customClick={this.addSkill.bind(this)}
            />
          </Overlay>

          {/* Modal Work Experience */}

          <Overlay visible={this.state.modalVisibleWorkExpierience} onClose={this.onCloseWorkExpierience} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Company Name</Text>
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
                placeholder="Company Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(workCompanyName) => this.setState({ workCompanyName })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Work Title</Text>
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
                placeholder="Work Title"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(workTitle) => this.setState({ workTitle })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Description </Text>
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
                leftIcon={
                  <SimpleIcon name="lock" color="black" size={25} />}
                placeholder="Description"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(workDescription) => this.setState({ workDescription })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Start Date </Text>
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
                placeholder="Enter Start Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(workStartDate) => this.setState({ workStartDate })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter End Date </Text>
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
                placeholder="Enter End Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(workEndDate) => this.setState({ workEndDate })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Add Work Experience"
              customClick={this.addWorkExperience.bind(this)}
            />
            <View style={styles.triangleRight} />
          </Overlay>

          {/* Modal Update Language */}

          <Overlay visible={this.state.modalVisibleLanguageUpdate} onClose={this.onCloseLanguageUpdate} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Language name</Text>
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
                placeholder='Language Name'
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getNameLanguage}
                onChangeText={(getNameLanguage) => this.setState({ getNameLanguage })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Language Level </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.getLevelLanguage}
                selectedStar={(getLevelLanguage) => this.setState({ getLevelLanguage })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Update Language"
              customClick={this.modifyLanguage.bind(this)}
            />
          </Overlay>

          {/* Modal Update Hobby */}

          <Overlay visible={this.state.modalVisibleHobbyUpdate} onClose={this.onCloseHobbyUpdate} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Hobby name</Text>
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
                placeholder='Hobby Name'
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getNameHobby}
                onChangeText={(getNameHobby) => this.setState({ getNameHobby })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Description </Text>
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
                placeholder="Enter Description Hobby"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getDescriptionHobby}
                onChangeText={(getDescriptionHobby) => this.setState({ getDescriptionHobby })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Update Hobby"
              customClick={this.modifyHobby.bind(this)}
            />
          </Overlay>

          {/* Modal Update Skill */}

          <Overlay visible={this.state.modalVisibleSkillUpdate} onClose={this.onCloseSkillUpdate} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Skill name</Text>
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
                placeholder='Skill Name'
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getNameSkill}
                onChangeText={(getNameSkill) => this.setState({ getNameSkill })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Skill Level </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.getLevelSkill}
                selectedStar={(getLevelSkill) => this.setState({ getLevelSkill })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Update Skill"
              customClick={this.modifySkill.bind(this)}
            />
          </Overlay>

          {/* Modal Course Update */}


          <Overlay visible={this.state.modalVisibleCourseUpdate} onClose={this.onCloseCourseUpdate} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Course Name</Text>
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
                placeholder="Course Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getNameCourse}
                onChangeText={(getNameCourse) => this.setState({ getNameCourse })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Start Date </Text>
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
                placeholder="Start Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getStartDateCourse}
                onChangeText={(getStartDateCourse) => this.setState({ getStartDateCourse })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter End Date </Text>
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
                placeholder="End Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getEndDateCourse}
                onChangeText={(getEndDateCourse) => this.setState({ getEndDateCourse })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Description </Text>
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
                value={this.state.getDescriptionCourse}
                onChangeText={(getDescriptionCourse) => this.setState({ getDescriptionCourse })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Update Course"
              customClick={this.modifyCourse.bind(this)}
            />
          </Overlay>

          {/* Modal Education Update */}

          <Overlay visible={this.state.modalVisibleEducationUpdate} onClose={this.onCloseEducationUpdate} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter School Name</Text>
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
                placeholder="School Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getEducationSchoolName}
                onChangeText={(getEducationSchoolName) => this.setState({ getEducationSchoolName })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Start Date </Text>
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
                placeholder="Start Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getEducationStartDate}
                onChangeText={(getEducationStartDate) => this.setState({ getEducationStartDate })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter End Date </Text>
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
                placeholder="End Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getEducationEndDate}
                onChangeText={(getEducationEndDate) => this.setState({ getEducationEndDate })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Title Degree </Text>
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
                placeholder="Title Degree"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getEducationTitle}
                onChangeText={(getEducationTitle) => this.setState({ getEducationTitle })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Description </Text>
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
                value={this.state.getEducationDescription}
                onChangeText={(getEducationDescription) => this.setState({ getEducationDescription })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Update Education"
              customClick={this.modifyEducation.bind(this)}
            />
          </Overlay>

          {/* Modal Work Experience Update*/}

          <Overlay visible={this.state.modalVisibleWorkExperienceUpdate} onClose={this.onCloseWorkExperienceUpdate} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter Company Name</Text>
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
                placeholder="Enter Company Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getWorkExperienceCompanyName}
                onChangeText={(getWorkExperienceCompanyName) => this.setState({ getWorkExperienceCompanyName })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Work Title </Text>
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
                placeholder="Enter Work Title"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getWorkExperienceWorkTitle}
                onChangeText={(getWorkExperienceWorkTitle) => this.setState({ getWorkExperienceWorkTitle })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Description </Text>
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
                placeholder="Enter Description"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getWorkExperienceWorkDescription}
                onChangeText={(getWorkExperienceWorkDescription) => this.setState({ getWorkExperienceWorkDescription })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter Start Date </Text>
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
                placeholder="Enter Start Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getWorkExperienceStartDate}
                onChangeText={(getWorkExperienceStartDate) => this.setState({ getWorkExperienceStartDate })}
              />
              <View style={styles.triangleRight} />

              <Text>Enter End Date </Text>
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
                placeholder="Enter End Date yyyy-mm-dd"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.getWorkExperienceEndDate}
                onChangeText={(getWorkExperienceEndDate) => this.setState({ getWorkExperienceEndDate })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Update Work"
              customClick={this.modifyWorkExperience.bind(this)}
            />
          </Overlay>

          <View style={styles.ActionButton}>
            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item style={styles.actionButtonItemIcon} buttonColor='green' size={60} onPress={() => this.setState({ modalVisibleEducation: true })}>
                <Entypo name="book" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item style={styles.actionButtonItemIcon} buttonColor='blue' size={60} onPress={() => this.setState({ modalVisibleWorkExpierience: true })}>
                <FontAwesome name="suitcase" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item style={styles.actionButtonItemIcon} buttonColor='yellow' size={60} onPress={() => this.setState({ modalVisibleHobby: true })}>
                <FontAwesome5 name="dumbbell" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item style={styles.actionButtonItemIcon} buttonColor='cyan' size={60} onPress={() => this.setState({ modalVisibleLanguage: true })}>
                <Entypo name="language" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item style={styles.actionButtonItemIcon} buttonColor='purple' size={60} onPress={() => this.setState({ modalVisibleCourse: true })}>
                <MaterialCommunityIcons name="certificate" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item style={styles.actionButtonItemIcon} buttonColor='red' size={60} onPress={() => this.setState({ modalVisibleSkill: true })}>
                <FontAwesome name="html5" style={styles.actionButtonIcon} />
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
  container1: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  CardView: {
    zIndex: 0,
  },

  ActionButton: {
    paddingTop: 200,
    zIndex: 1,
    position: 'relative',
    right: 0,
    bottom: 0,
  },
  actionButtonItemIcon: {
    zIndex: 100,
  },
  actionButtonIcon: {
    fontSize: 35,
    color: 'white',
    zIndex: 100,
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