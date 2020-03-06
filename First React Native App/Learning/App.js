import React, { useState, useEffect, useRef } from "react";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import axios from "axios";
import { AsyncStorage, AppState } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { setPasswords } from "./actions/passwordActions";
import { PasswordProvider, usePassword } from "./context/PasswordContext";
import { UserProvider, useUser } from "./context/UserContext";

//Components
import HomeScreen from "./screens/HomeScreen";
import Passwords from "./screens/Passwords";
import Settings from "./screens/Settings";
import {
  setUser,
  retrieveSettings,
  setLastUser,
  setNewUser,
  setPINCode,
  lock
} from "./actions/userActions";

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

const RootStack = createStackNavigator();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const AppStack = createMaterialBottomTabNavigator();

const Main = () => {
  const [passwords, passwordDispatch] = usePassword();
  const [user, userDispatch] = useUser();
  let isSet = useRef(false);

  const setUp = async () => {
    try {
      isSet.current = true;
      await Facebook.initializeAsync("875873252852334", "Pass Locker");
      await retrieveSettings(userDispatch);
      const PIN = await AsyncStorage.getItem("PIN");
      if (PIN) {
        setPINCode(userDispatch, PIN);
      }
      const data = await AsyncStorage.getItem("passwords");
      if (data) {
        setPasswords(data, passwordDispatch);
      }
      const lastUser = await AsyncStorage.getItem("lastUser");
      if (lastUser) {
        setLastUser(userDispatch, lastUser);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (!isSet.current) setUp();
  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(fbUser => {
      if (fbUser && !user.authenticated) {
        setUser(fbUser, userDispatch);
        AsyncStorage.getItem("lastUser").then(data => {
          if (!data) {
            AsyncStorage.setItem("lastUser", fbUser.uid);
            setNewUser(userDispatch, true);
          } else if (data && data !== fbUser.uid) {
            setPasswords([], passwordDispatch);
            setNewUser(userDispatch, true);
            AsyncStorage.removeItem("passwords");
            AsyncStorage.setItem("lastUser", fbUser.uid);
          }
          setLastUser(userDispatch, fbUser.uid);
        });
        fbUser.getIdToken(true).then(token => {
          axios.defaults.baseURL =
            "https://asia-east2-socialtrap-bc4f7.cloudfunctions.net/api";
          axios.defaults.headers.common["authtoken"] = `Bearer ${token}`;
        });
      }
    });
    AppState.addEventListener("change", state => {
      if (state === "background") lock(userDispatch);
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      activeColor="#d74d63"
      labeled={false}
      inactiveColor="gray"
      barStyle={{
        backgroundColor: user.theme === "light" ? "#fff" : "rgb(20, 20, 20)"
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Settings")
            iconName = focused ? "ios-list-box" : "ios-list";
          else iconName = "folder-key";
          switch (route.name) {
            case "Home":
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={25}
                  color={color}
                />
              );
            case "Settings":
              return <Ionicons name={iconName} size={25} color={color} />;
            default:
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={25}
                  color={color}
                />
              );
          }
        }
      })}
    >
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Passwords" component={Passwords} />
    </AppStack.Navigator>
  );
};

const loadImgAsync = async () => {
  const imageAssets = cacheImages([
    require("./assets/avatar.png"),
    require("./assets/blocks.png"),
    require("./assets/customize.png"),
    require("./assets/like.png")
  ]);
  await Promise.all([...imageAssets]);
};

const App = () => {
  const [loading, setLoading] = useState(true);
  return loading ? (
    <AppLoading
      startAsync={loadImgAsync}
      onFinish={() => setLoading(false)}
      onError={console.warn}
    />
  ) : (
    <NavigationContainer>
      <UserProvider>
        <PasswordProvider>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <RootStack.Screen name="Main" component={Main} />
          </RootStack.Navigator>
        </PasswordProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
