import { Navigation } from "react-native-navigation";
import App from './App';

import Regulations from './screens/Regulations';
import Login from './screens/Login';
import Registration from './screens/Registration';
import UserNavigationScreen from './screens/UserNavigationScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import routesUser from './screens/routes/routesUser';
import AdminHomeScreen from './screens/AdminHomeScreen';
import routesAdmin from "./screens/routes/routesAdmin";
import EditProfileScreen from "./screens/EditProfileScreen";
import UpdateProfileScreen from "./screens/UpdateProfileScreen";
import CVListScreen from "./screens/CVListScreen";
import PortfolioListScreen from "./screens/PortfolioListScreen";
import PortfolioModifyScreen from "./screens/PortfolioModifyScreen";
import CVModifyScreen from "./screens/CVModifyScreen";

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Regulations', () => Regulations);
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Registration', () => Registration);
Navigation.registerComponent('UserNavigationScreen', () => UserNavigationScreen);
Navigation.registerComponent('UserHomeScreen', () => UserHomeScreen);
Navigation.registerComponent('routesUser', () => routesUser);
Navigation.registerComponent('AdminHomeScreen', () => AdminHomeScreen);
Navigation.registerComponent('routesAdmin', () => routesAdmin);
Navigation.registerComponent('EditProfileScreen', () => EditProfileScreen);
Navigation.registerComponent('UpdateProfileScreen',() => UpdateProfileScreen);
Navigation.registerComponent('CVListScreen',() => CVListScreen);
Navigation.registerComponent('PortfolioListScreen', () => PortfolioListScreen);
Navigation.registerComponent('PortfolioModifyScreen',()=> PortfolioModifyScreen)
Navigation.registerComponent('CVModifyScreen',() => CVModifyScreen);

console.disableYellowBox = true;
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: false,
      drawBehind: true,
      animate: false,
      buttonColor: 'white',
      title: {
        color: 'white',
        alignment: 'center'
      },
      background: {
        color: 'transparent'
      }
    }
  });
  Navigation.setRoot({
        root: {
          stack: {
            id: 'MAIN_STACK',
            children: [
              {
                component: {
                  name: 'App',
                }
              },
            ]
          },
          id:'PortFolio_Name',
          children:[
            {
              component:{
                name:'Registration',
              }
            }
          ]
        }
      },
  );
});