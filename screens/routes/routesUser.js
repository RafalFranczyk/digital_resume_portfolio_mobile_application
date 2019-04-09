import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CVListScreen from '../CVListScreen';
import PortfolioListScreen from '../PortfolioListScreen';
import PortfolioModifyScreen from '../PortfolioModifyScreen';
import UserHomeScreen from '../UserHomeScreen';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    'Home Screen': UserHomeScreen,
    'Resumes': CVListScreen,
    'Portfolio': PortfolioListScreen,
    'Modify Portfolio': PortfolioModifyScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home Screen') {
          iconName = `ios-home`;
        } else if (routeName === 'Resumes') {
          iconName = `ios-planet`;
        } else if (routeName === 'Portfolio') {
          iconName = `ios-book`;
        } else if (routeName === 'Modify Portfolio') {
          iconName = `ios-pulse`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {
      backgroundColor: 'red',
      padding: 2,
    },
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);