import { AsyncStorage } from "react-native";

export const setTheme = (userDispatch, theme) => {
  userDispatch({
    type: "SET_THEME",
    payload: theme
  });
  AsyncStorage.setItem("theme", theme);
};

export const setSearchMode = (userDispatch, searchMode) => {
  userDispatch({
    type: "SET_SEARCH_MODE",
    payload: searchMode
  });
  AsyncStorage.setItem("searchMode", searchMode);
};

export const setLanguage = (userDispatch, language) => {
  userDispatch({
    type: "SET_LANGUAGE",
    payload: language
  });
  AsyncStorage.setItem("language", language);
};

export const setUser = (user, userDispatch) => {
  userDispatch({
    type: "SET_AUTHENTICATED"
  });
  userDispatch({
    type: "SET_USER",
    payload: {
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL + "?type=large"
    }
  });
};

export const logUserOut = userDispatch => {
  userDispatch({
    type: "SET_UNAUTHENTICATED"
  });
};

export const retrieveSettings = async userDispatch => {
  await Promise.all(
    ["theme", "language", "searchMode"].map(async key => {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        if (key === "theme") setTheme(userDispatch, value);
        else if (key === "language") setLanguage(userDispatch, value);
        else if (key === "searchMode") setSearchMode(userDispatch, value);
      }
    })
  );
};

export const setLastUser = (userDispatch, uid) => {
  userDispatch({ type: "SET_LAST_USER", payload: uid });
};

export const setNewUser = (userDispatch, value) => {
  console.log("Modifing user state to", value);
  userDispatch({ type: "SET_NEW_USER", payload: value });
};

export const setPINCode = (userDispatch, code) => {
  userDispatch({
    type: "SET_PIN",
    payload: code
  });
};

export const unlock = userDispatch => {
  userDispatch({ type: "SET_UNLOCKED" });
};

export const lock = userDispatch => {
  userDispatch({ type: "SET_LOCK" });
};
