import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {mainNavigatorTheme, mainTheme} from './config/Theme'
import {Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Screens } from './config/Screens';

import LoginComponent from './components/Login'
import HomepageComponent from './components/Homepage'
import ViewData from './components/ViewData'
import SendReport from './components/SendReport'
import Reports from './components/Reports'
import ViewReport from './components/ViewReport'
import ChangePassword from './components/ChangePassword'
import ChangeSettings from './components/ChangeSettings'

import firebase from "firebase/compat"
firebase.initializeApp(require("./config/Firebase").FirebaseConfig)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={mainTheme}>
      <NavigationContainer theme={mainNavigatorTheme}>
        <Stack.Navigator initialRouteName={Screens.Login} screenOptions={{headerShown: false}}>
          <Stack.Screen name={Screens.Login} component={LoginComponent}/>
          <Stack.Screen name={Screens.Dashboard} component={DashboardComponent}/>
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
              if (!user) navigation.navigate(Screens.Login)
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
    <Stack.Navigator initialRouteName={Screens.Homepage} screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.Homepage} component={HomepageComponent}/>
        <Stack.Screen name={Screens.ViewData} component={ViewData}/>
        <Stack.Screen name={Screens.SendReport} component={SendReport}/>
        <Stack.Screen name={Screens.Reports} component={Reports}/>
        <Stack.Screen name={Screens.ViewReport} component={ViewReport}/>
        <Stack.Screen name={Screens.ChangePassword} component={ChangePassword}/>
        <Stack.Screen name={Screens.ChangeSettings} component={ChangeSettings}/>
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
