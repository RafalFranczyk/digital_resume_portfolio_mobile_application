import { Navigation } from "react-native-navigation";
import App from './App';

Navigation.registerComponent('App', () => App);

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