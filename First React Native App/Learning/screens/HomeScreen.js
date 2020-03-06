import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { useUser } from "../context/UserContext";
import PIN from "../components/PINLock.component";

const HomeScreen = ({ navigation }) => {
  const [user, userDispatch] = useUser();
  const english = user.language === "English";
  const { width } = Dimensions.get("window");
  const _renderItem = ({ item }) => (
    <>
      <View style={{ ...styles.card, width: width - 48 }}>
        <View style={StyleSheet.absoluteFill}>
          <Image
            resizeMode="contain"
            style={{ flex: 1, borderRadius: 10, height: null, width: null }}
            source={item.imgSrc}
          />
        </View>
      </View>
      <Text style={styles.adsTxt}>{item.text}</Text>
    </>
  );
  return (
    <>
      <PIN
        PIN={user.PIN}
        userDispatch={userDispatch}
        visible={user.PIN && !user.unlocked}
        english={english}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: user.theme === "light" ? "#fff" : "rgb(18, 18, 18)"
        }}
      >
        <Text
          style={{
            ...styles.title,
            color: user.theme === "light" ? "#000" : "rgb(245, 246, 250)"
          }}
        >
          {english ? "Home" : "Nhà"}
        </Text>
        <Text
          style={{
            ...styles.brand,
            color: "#d74d63"
          }}
        >
          Pass L<Ionicons name="ios-finger-print" color="#d74d63" size={32} />
          cker
        </Text>
        <Text
          style={{
            ...styles.moto,
            color: user.theme === "light" ? "#000" : "#ecf0f1"
          }}
        >
          {english ? "Unlock the impossible" : "Mở khóa giới hạn"}
        </Text>
        <View style={{ height: 350, marginBottom: 50 }}>
          <Carousel
            data={[
              {
                text: english
                  ? "Safely save and store your data locally or sync them across devices"
                  : "Lưu dữ liệu trên máy hặc sao lưu giữa các thiết bị một cách an toàn",
                imgSrc: require("../assets/blocks.png")
              },
              {
                text: english
                  ? "Customize the look and feel of this app to your preference"
                  : "Điều chỉnh giao diện và ngôn ngữ",
                imgSrc: require("../assets/customize.png")
              },
              {
                text: english
                  ? "Love this app? Give the creator a thumb up!"
                  : "Thích ứng dụng này? Hãy ủng hộ nhà phát triển",
                imgSrc: require("../assets/like.png")
              }
            ]}
            renderItem={_renderItem}
            sliderWidth={width}
            autoplay
            loop
            firstItem={1}
            shouldOptimizeUpdates
            itemWidth={width * 0.9}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Passwords")}
          style={{
            padding: 24,
            width: 300,
            borderRadius: 30,
            elevation: user.theme === "light" ? 3 : 0,
            backgroundColor:
              user.theme === "light" ? "#fff" : "rgba(192, 43, 79, 0.2)"
          }}
        >
          <Text
            style={{
              ...styles.callToAction,
              color: "#d74d63"
            }}
          >
            {english ? "Get Started" : "Bắt đầu"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  brand: {
    ...Platform.select({
      ios: {
        fontFamily: "Helvetica"
      },
      android: {
        fontFamily: "monospace"
      }
    }),
    fontWeight: "bold",
    marginTop: 40,
    fontSize: 42,
    marginLeft: 24,
    alignSelf: "flex-start",
    textAlign: "left"
  },
  moto: {
    marginTop: 12,
    ...Platform.select({
      ios: {
        fontFamily: "Helvetica"
      },
      android: {
        fontFamily: "monospace"
      }
    }),
    fontSize: 18,
    marginLeft: 24,
    alignSelf: "flex-start",
    color: "#FFF"
  },
  btn: {
    padding: 20,
    width: 300,
    borderRadius: 35,
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 24
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: "rgba(45, 52, 54,1.0)"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 64,
    marginLeft: 24
  },
  card: {
    height: 250,
    borderRadius: 10,
    marginVertical: 16,
    justifyContent: "flex-end"
  },
  adsTxt: {
    fontWeight: "bold",
    color: "#636e72",
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontFamily: "Helvetica"
      },
      android: {
        fontFamily: "monospace"
      }
    }),
    paddingHorizontal: 24,
    width: "100%",
    textAlign: "center"
  },
  callToAction: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "transparent"
  }
});

export default HomeScreen;
