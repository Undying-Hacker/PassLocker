import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Button, Text } from 'react-native';
import { Asset } from 'expo-asset';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { PasswordProvider } from './context/PasswordContext';
import { UserProvider, useUser } from './context/UserContext';


//Components
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import Passwords from './screens/Passwords';
import Settings from './screens/Settings';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCM70ADkjpyT6OttiO-XJI-desqx9DzcdA",
  authDomain: "socialtrap-bc4f7.firebaseapp.com",
  databaseURL: "https://socialtrap-bc4f7.firebaseio.com",
  projectId: "socialtrap-bc4f7",
  storageBucket: "socialtrap-bc4f7.appspot.com",
  messagingSenderId: "1047730916082",
  appId: "1:1047730916082:web:d71741570f01a5f13b5e6b",
  measurementId: "G-L36PSMEP5V"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppStack = createMaterialBottomTabNavigator();
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const Main = () => {
  const user = useUser()[0];
  return (
    <AppStack.Navigator
      initialRouteName='Home'
      activeColor='tomato'
      inactiveColor='gray'
      barStyle={{ backgroundColor: user.theme === 'light'? '#fff': 'rgb(20, 20, 20)' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Settings') iconName = focused ? 'ios-list-box' : 'ios-list';
          else iconName = 'folder-key';
          switch (route.name) {
            case 'Home': return <MaterialCommunityIcons name={iconName} size={20} color={color} />
            case 'Settings': return <Ionicons name={iconName} size={20} color={color} />
            default: return <MaterialCommunityIcons name={iconName} size={20} color={color} />
          }
        }
      })}>
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Passwords" component={Passwords} />
    </AppStack.Navigator>
  )
}


const Auth = () => {
  return (
    <AuthStack.Navigator initialRouteName='Login' screenOptions={{
      headerShown: false
    }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  )
}

const loadImgAsync = async () => {
  const imageAssets = cacheImages([
    require('./assets/bg.jpeg')
  ]);

  await Promise.all([...imageAssets]);
}

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    loading ?
      <AppLoading
        startAsync={loadImgAsync}
        onFinish={() => setLoading(false)}
        onError={console.warn}
      /> :
      <UserProvider>
        <PasswordProvider>
          <NavigationContainer>
            <RootStack.Navigator initialRouteName="Auth" screenOptions={{
              headerShown: false
            }}>
              <RootStack.Screen name="Main" component={Main} />
              <RootStack.Screen name="Auth" component={Auth} />
              <RootStack.Screen name="Load" component={LoadingScreen} />
            </RootStack.Navigator>
          </NavigationContainer>
        </PasswordProvider>
      </UserProvider>
  )
}

export default App;