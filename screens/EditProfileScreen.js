import React, { Component } from 'react';
import { AsyncStorage, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Mybutton from './components/Mybutton';
import Mytextinput from './components/Mytextinput';

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      tokenAsync: '',
      roleAsync: '',
    };
  }
  async componentWillMount() {
    tokenAsync = await AsyncStorage.getItem('token');
    roleAsync = await AsyncStorage.getItem('role');
  }

  newScreen = (window) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: window
      }
    });
  };

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

  profile_user = () => {
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
                            fetch('http://www.digital-resume-portfolio.pl/profile', {
                              method: 'POST',
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
                                if (responseJson.statusCode === '200') {
                                  if (roleAsync === 'ROLE_USER') {
                                    this.newScreen('routesUser')
                                    ToastAndroid.show("Success Profile Update User", ToastAndroid.SHORT);
                                  } else if (roleAsync === 'ROLE_ADMIN') {
                                    this.newScreen('routesAdmin');
                                    ToastAndroid.show("Success Profile Update Android", ToastAndroid.SHORT);
                                  }
                                } else if (responseJson.status === '400') {
                                  ToastAndroid.show(responseJson.status + ' ' + responseJson.error, ToastAndroid.SHORT);
                                } else if (responseJson.statusCode === '409') {
                                  ToastAndroid.show(responseJson.statusCode + ' ' + responseJson.statusMessage, ToastAndroid.SHORT);
                                } else {
                                  ToastAndroid.show('Registration Failed', ToastAndroid.SHORT);
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
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.textTab}>Profile Page</Text>
        </View>
        <View style={styles.registerIcon}>
          <Image source={require('../img/registerIcon.png')} />
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>

            <Mytextinput
              placeholder="Enter your Name"
              onChangeText={name => this.setState({ name })}
            />
            <Mytextinput
              placeholder="Enter your Surname"
              onChangeText={surname => this.setState({ surname })}
            />
            <Mytextinput
              placeholder="Enter your Birth Date"
              onChangeText={birthDate => this.setState({ birthDate })}
            />

            <Mytextinput
              placeholder="Enter your Phone Number"
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
            />
            <Mytextinput
              placeholder="Enter your place of Birth"
              onChangeText={placeOfBirth => this.setState({ placeOfBirth })}
            />
            <Mytextinput
              placeholder="Enter your nationality"
              onChangeText={nationality => this.setState({ nationality })}
            />
            <Mytextinput
              placeholder="Enter your city"
              onChangeText={city => this.setState({ city })}
            />
            <Mytextinput
              placeholder="Enter your postal code"
              onChangeText={postalCode => this.setState({ postalCode })}
            />
            <Mytextinput
              placeholder="Enter your address"
              onChangeText={address => this.setState({ address })}
            />
            <Mytextinput
              placeholder="Enter your country"
              onChangeText={country => this.setState({ country })}
            />
            <Mybutton
              title="Submit"
              customClick={this.profile_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  registerIcon: {
    marginTop: 10,
    alignSelf: 'center'
  },
  toolbar: {
    backgroundColor: '#da2626',
    alignItems: 'center',
  },
  textTab: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
});
