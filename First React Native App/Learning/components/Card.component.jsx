import React, { useState, useEffect } from "react";
import Swipeable from "react-native-swipeable";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import Button from "./Button.component";
import Overlay from "./Overlay.component";

const Card = ({ data, edit, deleteItem, delay }) => {
  const user = useUser()[0];
  const english = user.language === "English";
  const { width, height } = Dimensions.get("window");
  const [isExpanded, setIsExpanded] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showPW, setShowPW] = useState(false);
  const [startAnime] = useState(new Animated.Value(0));
  const [expandAnime] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(startAnime, {
      duration: 500,
      delay,
      toValue: 1
    }).start();
  }, []);
  //Helper Functions
  return (
    <>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!isExpanded) {
              Animated.timing(expandAnime, {
                toValue: 1,
                duration: 300
              }).start();
              setIsExpanded(true);
              setShowPW(true);
            } else {
              Animated.timing(expandAnime, {
                toValue: 0,
                duration: 300
              }).start();
              setIsExpanded(false);
              setShowPW(false);
            }
          }}
        >
          <Animated.View
            style={{
              opacity: startAnime,
              marginTop: startAnime.interpolate({
                inputRange: [0, 1],
                outputRange: [25, 0]
              }),
              width,
              height: expandAnime.interpolate({
                inputRange: [0, 1],
                outputRange: [height * 0.1, height * 0.2]
              }),
              flexDirection: "row",
              marginBottom: 4
            }}
          >
            <View style={{ ...styles.container }} />
            <View
              style={{
                ...styles.content,
                backgroundColor:
                  user.theme === "light"
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(24, 24, 24, 0.6)"
              }}
            >
              <Text
                style={{
                  ...styles.platform,
                  color:
                    user.theme === "light" ? "#000" : "rgba(236, 240, 241,1.0)"
                }}
              >
                {data.platform}
              </Text>
              <Text
                style={{
                  ...styles.text,
                  color:
                    user.theme === "light" ? "#000" : "rgba(236, 240, 241,1.0)"
                }}
              >
                {isExpanded ? data.email : `${data.email.slice(0, 10)}...`}
              </Text>
              {showPW && (
                <Text
                  style={{
                    ...styles.text,
                    color:
                      user.theme === "light"
                        ? "#000"
                        : "rgba(236, 240, 241,1.0)"
                  }}
                >
                  {data.password}
                </Text>
              )}
            </View>
            {isExpanded && (
              <Animated.View
                style={{
                  ...styles.actions,
                  height: expandAnime.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "20%"]
                  })
                }}
              >
                <TouchableOpacity
                  onPress={edit}
                  style={{
                    marginHorizontal: 16,
                    zIndex: 2,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <AntDesign
                      name="edit"
                      size={32}
                      color="rgba(1, 163, 164,1.0)"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOverlayVisible(true)}
                  style={{
                    marginHorizontal: 16,
                    zIndex: 2,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <AntDesign
                      name="delete"
                      size={32}
                      color="rgba(192, 57, 43,1.0)"
                    />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      <Overlay visible={overlayVisible}>
        <Feather name="alert-triangle" size={80} color="red" />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "#95a5a6",
            marginVertical: 18
          }}
        >
          {english
            ? "Are you sure you want to delete this record? This action cannot be undone"
            : "Bạn có chắc muốn xóa? Dữ liệu sẽ không thể dược khôi phục"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => setOverlayVisible(false)}
            title={english ? "Cancel" : "Hủy"}
          />
          <Button
            onPress={() => {
              setOverlayVisible(false);
              deleteItem();
            }}
            style={{ backgroundColor: "#c23616" }}
            title={english ? "Delete" : "Xóa"}
          />
        </View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 3,
    height: "100%",
    backgroundColor: "#EF3653"
  },
  content: {
    flex: 1,
    height: "100%",
    paddingLeft: 16,
    justifyContent: "flex-start"
  },
  platform: {
    ...Platform.select({
      ios: {
        fontFamily: "Helvetica"
      },
      android: {
        fontFamily: "monospace"
      }
    }),
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    ...Platform.select({
      ios: {
        fontFamily: "Helvetica"
      },
      android: {
        fontFamily: "monospace"
      }
    }),
    fontSize: 16
  },
  delCross: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignSelf: "center",
    zIndex: 1
  },
  actions: {
    flexDirection: "row",
    position: "absolute",
    bottom: 12,
    width: '100%',
    justifyContent: 'space-around'
  }
});

export default Card;
