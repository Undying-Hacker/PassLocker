import React, {useState, memo, useRef} from 'react';
import { Input } from "galio-framework";
import { Modal, View, StyleSheet } from 'react-native';
import Button from './Button.component';
import { validateAccount } from '../util/validators';


export default memo(({ back, visible, cancel, user, addPassword, editValue, english }) => {

    //Hooks
    const editMode = useRef(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [platform, setPlatform] = useState("");
    const [errors, setErrors] = useState([]);
    const [focused, setFocused] = useState(false);

    //Helper Functions
    if (editValue !== null && !editMode.current) {
        editMode.current = true;
        setEmail(editValue.email);
        setPassword(editValue.password);
        setPlatform(editValue.platform);
    }

    const clear = () => {
        setEmail("");
        setPassword("");
        setPlatform("");
        editMode.current = false;
    }

    return (
        <Modal
        animationType="slide"
        presentationStyle="formSheet"
        backgroundColor={
          user.theme === "light" ? "rgb(245, 246, 250)" : "rgb(18, 18, 18)"
        }
        visible={visible}
        onRequestClose={() => {
          back();
          setErrors([]);
        }}
      >
        <View
          style={{
            ...styles.modal,
            backgroundColor:
              user.theme === "light" ? "rgb(245, 246, 250)" : "rgb(18, 18, 18)"
          }}
        >
          {errors.length > 0 && (
            <View style={styles.error}>
              {errors.map((error, i) => (
                <Text key={i} style={styles.errorTxt}>
                  {error}
                </Text>
              ))}
            </View>
          )}
          <Input
            style={{
              width: "80%",
              height: 60,
              borderWidth: 1,
              borderColor: focused === 0 ? "#EF3653" : "gray",
              backgroundColor:
                user.theme === "light"
                  ? "rgb(245, 246, 250)"
                  : "rgba(24, 24, 24, 0.6)"
            }}
            placeholder={english? "Email/Username": "Tên/email"}
            placeholderTextColor='gray'
            right
            placeholderTextColor={
              user.theme === "light"
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(236, 240, 241, 0.8)"
            }
            icon="email"
            autoCapitalize="none"
            type='email-address'
            autoFocus
            onFocus={() => setFocused(0)}
            value={email}
            onChangeText={setEmail}
            family="MaterialIcons"
            iconSize={28}
            iconColor={focused === 0 ? "#EF3653" : "gray"}
          />
          <Input
            right
            icon="key"
            autoCapitalize="none"
            value={password}
            placeholderTextColor='gray'
            placeholderTextColor={
              user.theme === "light"
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(236, 240, 241, 0.8)"
            }
            onFocus={() => setFocused(1)}
            onChangeText={setPassword}
            family="antdesign"
            iconSize={28}
            iconColor={focused === 1 ? "#EF3653" : "gray"}
            style={{
              width: "80%",
              height: 60,
              borderWidth: 1,
              borderColor: focused === 1 ? "#EF3653" : "gray",
              backgroundColor:
                user.theme === "light"
                  ? "rgb(245, 246, 250)"
                  : "rgba(24, 24, 24, 0.6)"
            }}
            placeholder={english? "Password/Key": "Mật khẩu"}
          />
          <Input
            right
            icon="apps"
            value={platform}
            placeholderTextColor='gray'
            placeholderTextColor={
              user.theme === "light"
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(236, 240, 241, 0.8)"
            }
            onFocus={() => setFocused(2)}
            onChangeText={setPlatform}
            family="MaterialCommunityIcons"
            iconSize={28}
            iconColor={focused === 2 ? "#EF3653" : "gray"}
            style={{
              width: "80%",
              height: 60,
              borderWidth: 1,
              borderColor: focused === 2 ? "#EF3653" : "gray",
              backgroundColor:
                user.theme === "light"
                  ? "rgb(245, 246, 250)"
                  : "rgba(24, 24, 24, 0.6)"
            }}
            placeholder={english? "Platform/App": "Ứng dụng"}
          />
          <View style={styles.modalBtnContainer}>
            <Button
              style={{backgroundColor: "#c23616" }}
              onPress={() => {
                cancel();
                setErrors([]);
                clear();
              }}
              title={english? "Cancel": "Hủy"}
            />
            <Button
              style={{ backgroundColor: '#3399D2'}}
              title={english? "Save": "Lưu"}
              onPress={() => {
                const item = { email, password, platform };
                const result = validateAccount(item);
                if (!result.valid) setErrors(result.errors);
                else {
                    setErrors([]);
                    if (editValue && editValue.synced) item.synced = true;
                    addPassword(item);
                    clear();
                }
              }}
            />
          </View>
        </View>
      </Modal>
    )
});

const styles = StyleSheet.create({
    error: {
        padding: 16,
        marginBottom: 24,
        backgroundColor: "#ff7979",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#c0392b"
      },
      errorTxt: {
        fontSize: 14,
        color: "#c0392b",
        fontWeight: "bold"
      },
      modalBtnContainer: {
        flexDirection: "row"
      },
      modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
});