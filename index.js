import { Navigation } from "react-native-navigation";
import App from './App';
import Regulations from './screens/Regulations';
import Login from './screens/Login';

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Regulations', () => Regulations);
Navigation.registerComponent('Login', () => Login);

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