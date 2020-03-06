import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Platform
} from "react-native";
import { Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { unlock } from "../actions/userActions";

export default ({ visible, PIN, userDispatch, english }) => {
  const [pin, setPin] = useState("");
  const [shakeAnime] = useState(new Animated.Value(0));

  //Helper functions
  const handleNumPress = num => {
    if (pin.length === 5) {
      setPin(pin => pin + num);
      if (pin + num !== PIN) {
        Animated.sequence([
          Animated.timing(shakeAnime, {
            toValue: 10,
            duration: 80,
            useNativeDriver: true
          }),
          Animated.timing(shakeAnime, {
            toValue: -10,
            duration: 80,
            useNativeDriver: true
          }),
          Animated.timing(shakeAnime, {
            toValue: 10,
            duration: 80,
            useNativeDriver: true
          }),
          Animated.timing(shakeAnime, {
            toValue: 0,
            duration: 80,
            useNativeDriver: true
          })
        ]).start(() => setPin(""));
      } else {
        setPin("");
        unlock(userDispatch);
      }
    } else {
      setPin(pin => pin + num);
    }
  };
  return (
    <Overlay
      isVisible={visible ? true : false}
      overlayBackgroundColor="rgba(0, 0, 0, 0.75)"
      fullScreen
      animationType="fade"
    >
      <View style={{justifyContent: 'space-around', flex: 1}}>
        <View>
        <View style={{ alignSelf: "center" }}>
          <Ionicons name="ios-lock" size={48} color="#ecf0f1" />
        </View>
        <Text
          style={{
            color: "#ecf0f1",
            textAlign: "center",
            fontSize: 18,
            marginTop: 16,
            fontWeight: "bold",
            ...Platform.select({
                ios: {
                  fontFamily: 'Helvetica'
                },
                android: {
                  fontFamily: 'monospace'
                }
              }),
          }}
        >
          {english? "Enter PIN code": "Nhập mã PIN"}
        </Text>
        </View>
        <Animated.View
          style={{
            width: "50%",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-around",
            position: "relative",
            transform: [{ translateX: shakeAnime }]
          }}
        >
          {[1, 2, 3, 4, 5, 6].map(num => (
            <View
              key={num}
              style={{
                ...styles.dot,
                borderWidth: pin.length >= num ? 0 : 1.5,
                backgroundColor: pin.length >= num ? "#fff" : "transparent"
              }}
            ></View>
          ))}
        </Animated.View>
        <View style={styles.numpad}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(num => (
            <TouchableOpacity
              key={num}
              onPress={() => handleNumPress(num)}
              style={styles.num}
            >
              <Text style={styles.numTxt}>{num}</Text>
            </TouchableOpacity>
          ))}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => handleNumPress("0")}
              style={{ ...styles.num }}
            >
              <Text style={{ ...styles.numTxt }}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPin(pin => pin.slice(0, pin.length - 1))}
              style={{ position: "absolute", right: 35, top: 45 }}
            >
              <Ionicons name="ios-backspace" size={40} color="#ecf0f1" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  numpad: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignSelf: "center",
    position: "relative"
  },
  dot: {
    width: 14,
    height: 14,
    borderColor: "#FFF",
    borderRadius: 7
  },
  num: {
    width: 70,
    height: 70,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginTop: 30,
    backgroundColor: "rgba(150, 125, 125, 0.5)"
  },
  numTxt: {
    color: "#ecf0f1",
    ...Platform.select({
        ios: {
          fontFamily: 'Helvetica'
        },
        android: {
          fontFamily: 'monospace'
        }
      }),
    fontSize: 30,
    fontWeight: "bold"
  }
});
