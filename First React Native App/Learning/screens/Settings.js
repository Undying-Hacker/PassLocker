import React, { useState } from "react";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";

import {
  Animated,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Switch,
  AsyncStorage
} from "react-native";
import PINSetup from "../components/PINSetup.component";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";

//Actions
import {
  setTheme,
  setLanguage,
  setSearchMode,
  setPINCode
} from "../actions/userActions";
import { logUserOut } from "../actions/userActions";

export default function Passwords({ navigation }) {
  const [user, userDispatch] = useUser();
  const { width } = Dimensions.get("window");
  const english = user.language === "English";

  //Theme
  const [colorAnime] = useState(
    new Animated.Value(user.theme === "light" ? 0 : 1)
  );
  const [dropAnime] = useState(new Animated.Value(0));
  const [popAnime] = useState(new Animated.Value(0));
  const [PINOpen, setPINOpen] = useState(false);
  const [dropped, setDropped] = useState(false);
  const textColor = user.theme === "light" ? "#000" : "#ecf0f1";
  const backgroundColor = colorAnime.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(245, 246, 250)", "rgb(18, 18, 18)"]
  });

  //Helper functions
  const loginWithFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "875873252852334",
      {
        permissions: ["public_profile"]
      }
    );
    if (type === "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInWithCredential(credential);
    }
  };
  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        logUserOut(userDispatch);
      });
  };
  return (
    <Animated.View
      style={{
        ...styles.container,
        backgroundColor
      }}
    >
      <View style={styles.header}>
        <Text
          style={{
            ...styles.title,
            marginLeft: width * 0.01,
            color: textColor
          }}
        >
          {english ? "Settings" : "Cài đặt"}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            containerStyle={{
              borderColor: "tomato",
              borderWidth: 3,
              marginRight: 8
            }}
            size={80}
            rounded
            source={
              user.authenticated
                ? {
                    uri: user.credentials.photoURL
                  }
                : require("../assets/avatar.png")
            }
          />
          <View style={styles.userName}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: textColor }}
            >
              {!english
                ? user.authenticated
                  ? user.credentials.name
                  : "Đăng nhập để sao lưu"
                : user.authenticated
                ? user.credentials.name
                : "Log in to sync data"}
            </Text>
            <Text style={{ color: "#636e72" }}>
              {user.credentials.email || "Expand to see sign in options"}
            </Text>
          </View>
        </View>
        {!user.authenticated && (
          <TouchableOpacity
            style={{ alignSelf: "flex-start" }}
            onPress={() => {
              if (!dropped) {
                Animated.sequence([
                  Animated.timing(dropAnime, {
                    toValue: 1,
                    duration: 200
                  }),
                  Animated.spring(popAnime, { toValue: 1 })
                ]).start();
              } else {
                Animated.parallel([
                  Animated.spring(popAnime, { toValue: 0 }),
                  Animated.timing(dropAnime, {
                    toValue: 0,
                    duration: 400
                  })
                ]).start();
              }
              setDropped(!dropped);
            }}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: dropAnime.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "-180deg"]
                    })
                  }
                ]
              }}
            >
              <AntDesign name="down" size={28} color="#636e72" />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
      {!user.authenticated && (
        <Animated.View
          style={{
            height: dropAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 80]
            })
          }}
        >
          <Animated.View
            style={{ transform: [{ scale: popAnime }], opacity: popAnime }}
          >
            <TouchableOpacity
              onPress={loginWithFacebook}
              style={{
                backgroundColor: "#3b5998",
                marginVertical: 8,
                borderRadius: 50
              }}
            >
              <Text style={styles.userdropdowntext}>
                {english ? "Log in with Facebook" : "Đăng nhập bằng Facebook"}{" "}
                <Entypo name="facebook" color="#fff" size={16} />
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}
      <View style={{ ...styles.settings, paddingVertical: 32 }}>
        <View style={styles.optionBar}>
          <View style={{ ...styles.icon, backgroundColor: "#2c3e50" }}>
            <Entypo name="moon" size={32} color="#fdcb6e" />
          </View>
          <Text style={{ ...styles.optionTxt, color: textColor }}>
            {english ? "Dark mode" : "Chế độ tối"}
          </Text>
          <Switch
            style={{ marginLeft: "auto" }}
            value={user.theme === "dark"}
            onValueChange={() => {
              setTheme(userDispatch, user.theme === "light" ? "dark" : "light");
              if (user.theme === "light") {
                Animated.timing(colorAnime, {
                  toValue: 1,
                  duration: 300
                }).start();
              } else {
                Animated.timing(colorAnime, {
                  toValue: 0,
                  duration: 300
                }).start();
              }
            }}
          />
        </View>
        <View style={{ ...styles.optionBar, marginTop: 16 }}>
          <View style={{ ...styles.icon, backgroundColor: "#d63031" }}>
            <FontAwesome name="lock" size={32} color="#fff" />
          </View>
          <Text style={{ ...styles.optionTxt, color: textColor }}>
            {english ? "Use PIN lock" : "Dùng khóa PIN"}
          </Text>
          <Switch
            value={user.PIN}
            onValueChange={() => {
              if (!PINOpen) {
                if (!user.PIN.length) setPINOpen(true);
                else
                  AsyncStorage.removeItem("PIN").then(() => {
                    setPINCode(userDispatch, "");
                  });
              }
            }}
            style={{ marginLeft: "auto" }}
            value={user.PIN.length > 0}
          />
        </View>
        <Text
          style={{ fontWeight: "bold", color: "#636e72", marginVertical: 16 }}
        >
          {english ? "Passwords" : "Mật khẩu"}
        </Text>
        <TouchableOpacity
          style={styles.optionBar}
          onPress={() => {
            setSearchMode(
              userDispatch,
              user.searchMode === "Platform" ? "Email/Username" : "Platform"
            );
          }}
        >
          <View style={{ ...styles.icon, backgroundColor: "#3498db" }}>
            <AntDesign name="search1" size={32} color="#ecf0f1" />
          </View>
          <Text style={{ ...styles.optionTxt, color: textColor }}>
            {english ? "Search by" : "Chế độ lọc"}
          </Text>
          <View style={{ marginLeft: "auto" }}>
            <Text
              style={{
                ...styles.TxtChooser,
                borderColor: textColor,
                color: "#16a085"
              }}
            >
              {!english
                ? user.searchMode === "Platform"
                  ? "Ứng dụng"
                  : "Tên/Email"
                : user.searchMode}
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{ fontWeight: "bold", color: "#636e72", marginVertical: 16 }}
        >
          {english ? "Regional" : "Vùng"}
        </Text>
        <TouchableOpacity
          style={styles.optionBar}
          onPress={() => {
            setLanguage(
              userDispatch,
              user.language === "English" ? "Tiếng Việt" : "English"
            );
          }}
        >
          <View style={{ ...styles.icon, backgroundColor: "#6c5ce7" }}>
            <FontAwesome name="language" size={32} color="#ecf0f1" />
          </View>
          <Text style={{ ...styles.optionTxt, color: textColor }}>
            {english ? "Language" : "Ngôn ngữ"}
          </Text>
          <View style={{ marginLeft: "auto" }}>
            <Text
              style={{
                ...styles.TxtChooser,
                borderColor: textColor,
                color: "#16a085"
              }}
            >
              {user.language}
            </Text>
          </View>
        </TouchableOpacity>
        {user.authenticated && (
          <TouchableOpacity
            onPress={handleLogOut}
            style={{ ...styles.optionBar, marginTop: 16 }}
          >
            <View style={{ ...styles.icon, backgroundColor: "#eb4d4b" }}>
              <AntDesign name="logout" size={32} color="#ecf0f1" />
            </View>
            <Text style={{ ...styles.optionTxt, color: textColor }}>
              {english ? "Log Out" : "Đăng xuất"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <PINSetup
        PINOpen={PINOpen}
        setPINOpen={setPINOpen}
        lightTheme={user.theme === "light"}
        english={english}
        userDispatch={userDispatch}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  header: {
    width: "100%",
    paddingTop: 64,
    padding: 16
  },
  userInfo: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  settings: {
    width: "90%"
  },
  icon: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22.5,
    marginRight: 16
  },
  userdropdowntext: {
    fontSize: 16,
    paddingVertical: 12,
    textAlign: "center",
    color: "#fff",
    paddingHorizontal: 16,
    fontWeight: "900"
  },
  optionBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  optionTxt: {
    fontWeight: "bold",
    fontSize: 14
  },
  TxtChooser: {
    padding: 10,
    fontWeight: "bold",
    color: "#bdc3c7"
  }
});
