import React, { useState, useRef } from "react";
import {
  View,
  Modal,
  AsyncStorage,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity
} from "react-native";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { setPINCode, unlock } from "../actions/userActions";

export default ({ setPINOpen, PINOpen, lightTheme, english, userDispatch }) => {
  const [pin, setPin] = useState("");
  const { width } = Dimensions.get("window");
  const inputRef = useRef();
  return (
    <Modal onRequestClose={() => setPINOpen(false)} visible={PINOpen} animationType="slide">
      <Input
        ref={inputRef}
        autoFocus
        value={pin}
        onChangeText={(text) => {
            if (text.length <= 6) setPin(text.replace(/[^0-9]/g, ''));
        }}
        keyboardType='number-pad'
        containerStyle={{position: 'absolute'}}
      />
      <View style={{...styles.container, backgroundColor: lightTheme? '#fff': '#000'}}>
        <TouchableOpacity onPress={() => {
          setPINOpen(false);
          setPin("");
          }}><AntDesign name="left" size={32} size={28} color="#636e72" /></TouchableOpacity>
        <Text style={{fontSize: 20, marginTop: 16, color: lightTheme? '#000': '#ecf0f1'}}>{english? "Setting up": "Cài đặt"}</Text>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: lightTheme? '#000': '#ecf0f1' }}>{english? "Your PIN code": "Mã PIN của bạn"}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            inputRef.current.blur();
            setTimeout(() => inputRef.current.focus(), 100);
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                ...styles.pinNum,
                width: (width - 72) / 6,
                height: (width - 72) / 6
              }}
            >
              <Text style={{...styles.pinTxt, color: lightTheme? '#000': '#ecf0f1'}}>{pin.slice(0, 1)}</Text>
            </View>
            <View
              style={{
                ...styles.pinNum,
                width: (width - 72) / 6,
                height: (width - 72) / 6
              }}
            >
              <Text style={{...styles.pinTxt, color: lightTheme? '#000': '#ecf0f1'}}>{pin.slice(1, 2)}</Text>
            </View>
            <View
              style={{
                ...styles.pinNum,
                width: (width - 72) / 6,
                height: (width - 72) / 6
              }}
            >
              <Text style={{...styles.pinTxt, color: lightTheme? '#000': '#ecf0f1'}}>{pin.slice(2, 3)}</Text>
            </View>
            <View
              style={{
                ...styles.pinNum,
                width: (width - 72) / 6,
                height: (width - 72) / 6
              }}
            >
              <Text style={{...styles.pinTxt, color: lightTheme? '#000': '#ecf0f1'}}>{pin.slice(3, 4)}</Text>
            </View>
            <View
              style={{
                ...styles.pinNum,
                width: (width - 72) / 6,
                height: (width - 72) / 6
              }}
            >
              <Text style={{...styles.pinTxt, color: lightTheme? '#000': '#ecf0f1'}}>{pin.slice(4, 5)}</Text>
            </View>
            <View
              style={{
                ...styles.pinNum,
                width: (width - 72) / 6,
                height: (width - 72) / 6
              }}
            >
              <Text style={{...styles.pinTxt, color: lightTheme? '#000': '#ecf0f1'}}>{pin.slice(5, 6)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Text style={{fontSize: 20, marginTop: 16, width: width / 1.5, color: lightTheme? '#000': '#ecf0f1'}}>{english? "Enter a ": "Nhập một mã "}<Text style={{fontWeight: 'bold'}}>{english? "6 digit code": "6 chữ số "}</Text>{english? " then confirm it below to enable ": " sau đó xác nhận bên dưới để bật tính năng khóa "}<Text style={{fontWeight: 'bold'}}>PIN</Text>{english? " lock": ""}</Text>
        <View style={{width: width / 2, height: width / 2, alignSelf: 'center', marginTop: 32}}>
              <Image resizeMode='contain' style={{flex: 1, alignSelf: 'center'}} source={require('../assets/secure.png')} />
        </View>
        <TouchableOpacity disabled={pin.length !== 6} onPress={() => {
          if (pin.length == 6) {
            AsyncStorage.setItem('PIN', pin).then(() => {
              setPINCode(userDispatch, pin);
              setPin("");
              unlock(userDispatch);
              setPINOpen(false);
            })
          }
        }}>
        <Text style={{...styles.setBtn, width: width - 32, opacity: pin.length < 6? 0.5: 1, color:'#ecf0f1'}}>{english? "CONFIRM PIN": "XÁC NHẬN PIN"}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between'
  },
  pinNum: {
    borderBottomColor: "#EA2027",
    borderBottomWidth: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  pinTxt: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center"
  },
  setBtn: {
    alignSelf: 'center',
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '100',
    ...Platform.select({
      ios: {
        fontFamily: 'Helvetica'
      },
      android: {
        fontFamily: 'monospace'
      }
    }),
    backgroundColor: '#E5393F',
    color: '#fff',
    borderRadius: 10,
    marginTop: 32
  }
});
