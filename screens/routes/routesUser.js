import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import UserHomeScreen from '../UserHomeScreen';
import Registration from '../Registration';
import Login from '../Registration';

import Icon from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabNavigator = createMaterialBottomTabNavigator(
  {
        'Home Screen':UserHomeScreen,
        'Registration':Registration,
        'Login':Login,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home Screen') {
        iconName = `ios-home`;
      } else if (routeName === 'Registration') {
        iconName = `ios-planet`;
      }else if (routeName === 'Login') {
        iconName = `ios-photos`;}
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { 
    backgroundColor: 'red',
    padding : 2,
  },
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
}
);

export default createAppContainer(TabNavigator);