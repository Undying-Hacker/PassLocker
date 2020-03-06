import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  AsyncStorage
} from "react-native";
import {
  addPassword,
  editPassword,
  deletePassword,
  getSyncedPasswords,
  syncData,
  deleteSyncedPassword,
  editSyncedPassword
} from "../actions/passwordActions";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import { useUser } from "../context/UserContext";
import { usePassword } from "../context/PasswordContext";
import Card from "../components/Card.component";
import { FlatList } from "react-native-gesture-handler";
import Modal from "../components/AddPasswordModal.component";
import { setNewUser } from "../actions/userActions";

export default function Passwords({ navigation }) {
  //Hooks
  const [spin] = useState(new Animated.Value(0));
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [editValue, setEditValue] = useState(null);
  const [passwords, passwordDispatch] = usePassword();
  const [isEdit, setIsEdit] = useState(false);
  const [user, userDispatch] = useUser();
  const english = user.language === "English";

  //Helper functions
  const startSyncAnimation = () => {
    spin.setValue(0);
    Animated.timing(spin, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start(() => {
      if (syncing) startSyncAnimation();
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (user.authenticated) {
        if (user.isNew) {
          setSyncing(true);
          startSyncAnimation();
          getSyncedPasswords(passwordDispatch, setSyncing);
          setNewUser(userDispatch, false);
        } else {
          syncData(passwords, passwordDispatch);
        }
        if (user.lastUser) {
          AsyncStorage.getItem("offlineDeletes").then(data => {
            if (data) {
              const successful = [];
              Promise.all(
                JSON.parse(data)
                  .filter(entry => entry.uid === user.lastUser)
                  .map(async entry => {
                    await deleteSyncedPassword(entry.id)
                      .then(() => successful.push(entry.id))
                      .catch(err => console.log(err));
                  })
              ).then(() => {
                AsyncStorage.setItem(
                  "offlineDeletes",
                  JSON.stringify(
                    JSON.parse(data).filter(
                      entry => !successful.includes(entry.id)
                    )
                  )
                );
              });
            }
          });
          AsyncStorage.getItem("offlineEdits").then(data => {
            if (data) {
              const successful = [];
              Promise.all(
                JSON.parse(data)
                  .filter(entry => entry.uid === user.lastUser)
                  .map(async entry => {
                    await editSyncedPassword(entry.id, entry.item)
                      .then(() => successful.push(entry.id))
                      .catch(err => console.log(err));
                  })
              ).then(() => {
                AsyncStorage.setItem(
                  "offlineEdits",
                  JSON.stringify(
                    JSON.parse(data).filter(
                      entry => !successful.includes(entry.id)
                    )
                  )
                );
              });
            }
          });
        }
      }
    });
    return unsubscribe;
  }, [navigation, passwords, passwordDispatch]);

  //Animated
  const { width } = Dimensions.get("window");

  //Helper Functions
  const handleEdit = (item, id) => {
    setEditValue(item);
    setModalVisible(true);
    setIsEdit(id);
  };
  const handleDelete = item => {
    deletePassword(passwordDispatch, item.id, item.synced, user.lastUser);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    if (isEdit) setIsEdit(false);
    setEditValue(null);
  };

  const handleAddPassword = item => {
    if (typeof isEdit === "string") {
      editPassword(passwordDispatch, isEdit, item, item.synced, user.lastUser);
      setIsEdit(false);
    } else
      addPassword(passwordDispatch, item, user.authenticated, setProcessing);
    setModalVisible(false);
    setEditValue(null);
  };
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor:
          user.theme === "light" ? "rgb(245, 246, 250)" : "rgb(18, 18, 18)"
      }}
    >
      <View style={styles.topBar}>
        <Text
          style={{
            ...styles.title,
            color: user.theme === "light" ? "#000" : "rgba(236, 240, 241,1.0)"
          }}
        >
          {english ? "Search" : "Tìm kiếm"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setSyncing(true);
            startSyncAnimation();
            getSyncedPasswords(passwordDispatch, setSyncing);
          }}
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <AntDesign
            name="cloudo"
            color={user.theme === "light" ? "#000" : "#fff"}
            size={38}
          />
          <Animated.View
            style={{
              position: "absolute",
              top: 14,
              left: 13,
              transform: [
                {
                  rotate: spin.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"]
                  })
                }
              ]
            }}
          >
            <View>
              <AntDesign
                name="sync"
                color={user.theme === "light" ? "#000" : "#fff"}
                size={13}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <SearchBar
        placeholder={
          english
            ? `Search by ${user.searchMode.toLowerCase()}...`
            : user.searchMode === "Platform"
            ? "Tìm bằng tên ứng dụng"
            : "Tìm bằng tên/email"
        }
        value={search}
        lightTheme={user.theme === "light"}
        onChangeText={setSearch}
        containerStyle={{
          width: width,
          paddingTop: 16,
          backgroundColor:
            user.theme === "light"
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(24, 24, 24, 0.6)"
        }}
      />
      <View style={{ flex: 1 }}>
        {passwords.length > 0 && (
          <FlatList
            data={
              !search
                ? passwords
                : passwords.filter(item => {
                    return user.searchMode === "Platform"
                      ? new RegExp(search, "gi").test(item.platform)
                      : new RegExp(search, "gi").test(item.email);
                  })
            }
            style={styles.pwContainer}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <Card
                data={item}
                edit={() => handleEdit(item, item.id)}
                deleteItem={() => handleDelete(item)}
                delay={50 * index}
              />
            )}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" color="#fff" size={32} />
      </TouchableOpacity>

      <Modal
        addPassword={item => handleAddPassword(item)}
        visible={modalVisible}
        user={user}
        english={english}
        cancel={handleModalCancel}
        back={handleModalCancel}
        editValue={editValue}
      />
      {processing && (
        <Text
          style={{
            position: "absolute",
            bottom: 16,
            fontSize: 16,
            padding: 12,
            textAlign: "center",
            backgroundColor: "rgba(127, 140, 141, 0.4)",
            borderRadius: 50,
            color:
              user.theme === "light"
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(236, 240, 241, 0.8)"
          }}
        >
          Processing...
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  topBar: {
    width: "100%",
    paddingHorizontal: 18,
    height: 88,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  addBtn: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EF3653",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  syncBtn: {
    paddingTop: 12,
    color: "#000",
    fontSize: 22,
    borderRadius: 10
  }
});
