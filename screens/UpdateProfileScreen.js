import React from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';
import { Navigation } from 'react-native-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Mybutton from './components/Mybutton';

export default class UpdateProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      modalVisible: false,
      tokenAsync: '',
      isLoading: true,
      dataSource: null,
      name: '',
      surname: '',
      birthDate: '',
      phoneNumber: '',
      placeOfBirth: '',
      nationality: '',
      city: '',
      postalCode: '',
      address: '',
      country: '',
      roleAsync: '',
    };
  }

  newScreen = (window) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: window
      }
    });
  };

  async componentDidMount() {
    tokenAsync = await AsyncStorage.getItem('token');
    roleAsync = await AsyncStorage.getItem('role');
    usernameEmailAsync = await AsyncStorage.getItem('email');
    return fetch('http://www.server-digital-resume-portfolio.pl/profile', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.statusCode)
        console.log(tokenAsync)
        console.log(responseJson.profile)
        if (responseJson.statusCode === '200') {
          this.setState({
            isLoading: false,
            name: responseJson.profile.name,
            surname: responseJson.profile.surname,
            birthDate: responseJson.profile.birthDate,
            phoneNumber: responseJson.profile.phoneNumber,
            placeOfBirth: responseJson.profile.placeOfBirth,
            nationality: responseJson.profile.nationality,
            city: responseJson.profile.city,
            postalCode: responseJson.profile.postalCode,
            address: responseJson.profile.address,
            country: responseJson.profile.country,
          })
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  validate(text, type) {
    birthDatePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/

    phoneNumberPattern = /^([0-9]{9})$/

    if (type === 'birthDate') {
      if (birthDatePattern.test(text)) {
        return true
      } else {
        return false
      }
    } else if (type === 'phoneNumber') {
      if (phoneNumberPattern.test(text)) {
        return true
      } else {
        return false
      }
    }
  }

  updateUserProfile = () => {
    const { name } = this.state;
    const { surname } = this.state;
    const { birthDate } = this.state;
    const { phoneNumber } = this.state;
    const { placeOfBirth } = this.state;
    const { nationality } = this.state;
    const { city } = this.state;
    const { postalCode } = this.state;
    const { address } = this.state;
    const { country } = this.state;

    if (name) {
      if (surname) {
        if (birthDate) {
          if (this.validate(birthDate, 'birthDate')) {
            if (phoneNumber) {
              if (placeOfBirth) {
                if (nationality) {
                  if (city) {
                    if (postalCode) {
                      if (address) {
                        if (country) {
                          if (this.validate(phoneNumber, 'phoneNumber')) {
                            fetch('http://www.server-digital-resume-portfolio.pl/profile', {
                              method: 'PUT',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + tokenAsync
                              },
                              body: JSON.stringify({
                                name: name,
                                surname: surname,
                                birthDate: birthDate,
                                phoneNumber: phoneNumber,
                                placeOfBirth: placeOfBirth,
                                nationality: nationality,
                                city: city,
                                postalCode: postalCode,
                                address: address,
                                country: country
                              })
                            }).then((response) => response.json())
                              .then((responseJson) => {
                                console.log(responseJson)
                                console.log(responseJson.statusCode)
                                console.log(tokenAsync)
                                if (responseJson.statusCode === '200') {
                                  if (roleAsync === 'ROLE_USER') {
                                    this.newScreen('routesUser');
                                    ToastAndroid.show("Update Your Profile Success", ToastAndroid.SHORT);
                                  } else if (roleAsync === 'ROLE_ADMIN') {
                                    this.newScreen('routesAdmin');
                                    ToastAndroid.show("Update Your Profile Success", ToastAndroid.SHORT);
                                  }
                                } else if (responseJson.status === '400') {
                                  ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT);
                                } else if (responseJson.statusCode === '409') {
                                  ToastAndroid.show(responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
                                } else {
                                  ToastAndroid.show('Update Failed', ToastAndroid.SHORT);
                                }
                              })
                          } else { ToastAndroid.show('Phone number incorrect format', ToastAndroid.SHORT); }
                        } else { ToastAndroid.show('Please enter your country', ToastAndroid.SHORT); }
                      } else { ToastAndroid.show('Please enter your address', ToastAndroid.SHORT); }
                    } else { ToastAndroid.show('Please enter your postal code', ToastAndroid.SHORT); }
                  } else { ToastAndroid.show('Please enter your city', ToastAndroid.SHORT); }
                } else { ToastAndroid.show('Please enter your nationality', ToastAndroid.SHORT); }
              } else { ToastAndroid.show('Please enter your place of birth', ToastAndroid.SHORT); }
            } else { ToastAndroid.show('Please enter your phone number', ToastAndroid.SHORT); }
          } else { ToastAndroid.show('Birth Date Incorrect Format (yyyy-MM-dd)', ToastAndroid.SHORT); }
        } else { ToastAndroid.show('Please enter your birthDate', ToastAndroid.SHORT); }
      } else { ToastAndroid.show('Please enter your surname', ToastAndroid.SHORT); }
    } else { ToastAndroid.show('Please enter your name', ToastAndroid.SHORT); }
  }

  backToHome = () => {
    if (roleAsync === 'ROLE_USER') {
      this.newScreen('routesUser');
      ToastAndroid.show('Welcome in Home Screen', ToastAndroid.SHORT)
    } else if (roleAsync === 'ROLE_ADMIN') {
      this.newScreen('routesAdmin');
      ToastAndroid.show('Welcome in Home Screen', ToastAndroid.SHORT)
    }
  };

  deleteAccount = () => {
    onClose = () => this.setState({ modalVisible: false });
    console.log('token delete' + tokenAsync)
    console.log('password ' + this.state.password)
    fetch('http://www.server-digital-resume-portfolio.pl/mobile/auth/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAsync
      },
      body: JSON.stringify({
        passwordConfirmation: this.state.password
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('1 ' + responseJson)
        console.log('2 ' + responseJson.statusCode)
        if (responseJson.statusCode === '200') {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('role');
          AsyncStorage.removeItem('email');
          this.newScreen('App')
          ToastAndroid.show('Delete Account success :)', ToastAndroid.SHORT);
        } else if (responseJson.status === '401') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        } else if (responseJson.status === '500') {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  onClose = () => this.setState({ modalVisible: false });

  alertDelete = () => this.setState({ modalVisible: true });

  onClick(event) {
    this.onClose();
    this.deleteAccount();
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
            <TouchableOpacity style={styles.buttonLogoutLeft} onPress={this.backToHome.bind(this)}>
              <MaterialIcons style={styles.iconLogout} name={'keyboard-backspace'} size={35} color={'white'} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#ffffff', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Profile Section</Text>
            <TouchableOpacity style={styles.buttonLogoutRight} onPress={this.alertDelete.bind(this)}>
              <AntDesign style={styles.iconLogout} name={'deleteuser'} size={35} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={styles.loginIcon}>
            <Ionicons style={styles.iconLogout} name={'ios-person'} size={70} color={'white'} />
          </View>

          <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside>
            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
              <Text>Enter your password if you really want delete your account</Text>
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
                placeholder="Password"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={true}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(password) => this.setState({ password })}
              />
              <View style={styles.triangleRight} />
            </View>
            <Mybutton
              title="Delete Account"
              customClick={this.onClick.bind(this)}
            />
          </Overlay>

          <View style={{ width: 100 + "%", alignItems: 'center' }}>

            <View style={styles.overlay}>
              <View style={styles.triangleLeft} />
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
                placeholder="Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="surname"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.surname}
                onChangeText={surname => this.setState({ surname })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="birthDate"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.birthDate}
                onChangeText={birthDate => this.setState({ birthDate })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="phoneNumber"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.phoneNumber}
                onChangeText={phoneNumber => this.setState({ phoneNumber })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="placeOfBirth"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.placeOfBirth}
                onChangeText={placeOfBirth => this.setState({ placeOfBirth })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="nationality"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.nationality}
                onChangeText={nationality => this.setState({ nationality })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="city"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.city}
                onChangeText={city => this.setState({ city })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="postalCode"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.postalCode}
                onChangeText={postalCode => this.setState({ postalCode })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="address"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.address}
                onChangeText={address => this.setState({ address })}
              />
              <View style={styles.triangleRight} />
            </View>

            <View style={[styles.overlay, { marginTop: 10 }]}>
              <View style={styles.triangleLeft} />
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
                placeholder="country"
                placeholderTextColor="black"
                autoCapitalize="none"
                keyboardAppearance="light"
                secureTextEntry={false}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                value={this.state.country}
                onChangeText={country => this.setState({ country })}
              />
              <View style={styles.triangleRight} />
            </View>
          </View>

          <Mybutton
            title="Update"
            customClick={this.updateUserProfile.bind(this)}
          />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F343B',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonLogoutLeft: {
    marginLeft: 20,
    marginTop: 12,
    paddingRight: 40,
  },
  buttonLogoutRight: {
    marginTop: 12,
    paddingLeft: 20,
    marginRight: 20,
  },
  loginIcon: {
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  toolbar: {
    backgroundColor: '#da2626',
    flexDirection: "row",
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