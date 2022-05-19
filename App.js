import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {mainNavigatorTheme, mainTheme} from './config/Theme'
import {Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { screens } from './config/Screens';

import LoginComponent from './components/Login'
import HomepageComponent from './components/Homepage'
import SendReport from './components/SendReport';

import firebase from "firebase/compat"
firebase.initializeApp(require("./config/Firebase").FirebaseConfig)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={mainTheme}>
      <NavigationContainer theme={mainNavigatorTheme}>
        <Stack.Navigator initialRouteName={screens.Login} screenOptions={{headerShown: false}}>
          <Stack.Screen name={screens.Login} component={LoginComponent}/>
          <Stack.Screen name={screens.Dashboard} component={DashboardComponent}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

let DashboardComponent = ({navigation}) => {
  const [currentUserData, setCurrentUserData] = useState({});
  const [init, setInit] = useState(false)

  useEffect(() => {
      if (!init) {
          setInit(true);
          firebase.auth().onAuthStateChanged(user => {
              if (!user) navigation.navigate(screens.Login)
              else {
                  firebase.database().ref(`Coordinators/${user.uid}`).on("value", snapshot => {
                      const value = snapshot.val()
                      setCurrentUserData(value)
                  })
              }
          });
      }
  })

  return(
    <Stack.Navigator initialRouteName={screens.Homepage} screenOptions={{headerShown: false}}>
        <Stack.Screen name={screens.Homepage} component={HomepageComponent}/>
        <Stack.Screen name={screens.SendReport} component={SendReport}/>
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
