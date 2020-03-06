import { AsyncStorage } from "react-native";
import axios from "axios";

export const addPassword = (passwordDispatch, item, sync, setProcessing) => {
  const addPasswordOffline = () => {
    passwordDispatch({
      type: "ADD_PASSWORD",
      payload: {
        ...item,
        id: Math.round(Math.random() * 10000000000).toString(),
        synced: false
      }
    });
  };
  if (sync) {
    setProcessing(true);
    axios
      .post("/passwords", item)
      .then(response => {
        passwordDispatch({
          type: "ADD_PASSWORD",
          payload: { ...item, id: response.data.id, synced: true }
        });
        setProcessing(false);
      })
      .catch(() => {
        addPasswordOffline();
        setProcessing(false);
      });
  } else {
    addPasswordOffline();
  }
};

export const setPasswords = (data, passwordDispatch) => {
  passwordDispatch({
    type: "SET_PASSWORDS",
    payload: typeof data === "string" ? JSON.parse(data) : data
  });
};

export const editPassword = (passwordDispatch, id, item, sync, lastUser) => {
  const addToEditQueue = () => {
    if (lastUser) {
      AsyncStorage.getItem("offlineEdits").then(data => {
        let queue = JSON.parse(data) || [];
        queue = queue.filter(entry => entry.id !== id);
        queue.push({ uid: lastUser, id, item });
        AsyncStorage.setItem("offlineEdits", JSON.stringify(queue));
      });
    }
  };
  passwordDispatch({
    type: "EDIT_PASSWORD",
    payload: { id, item }
  });
  if (sync) {
    axios
      .patch(`/passwords/${id}`, {
        email: item.email,
        password: item.password,
        platform: item.platform
      })
      .catch(addToEditQueue);
  }
};

export const deletePassword = (passwordDispatch, id, sync, lastUser) => {
  const addToDeleteQueue = () => {
    if (lastUser) {
      AsyncStorage.getItem("offlineDeletes").then(data => {
        let queue = JSON.parse(data) || [];
        queue.push({ uid: lastUser, id });
        AsyncStorage.setItem("offlineDeletes", JSON.stringify(queue));
      });
    }
  };
  passwordDispatch({
    type: "DELETE_PASSWORD",
    payload: id
  });
  if (sync) axios.delete(`/passwords/${id}`).catch(addToDeleteQueue);
};

export const saveData = async data => {
  try {
    await AsyncStorage.setItem("passwords", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const syncPassword = async data => {
  try {
    const response = await axios.post("/passwords", {
      email: data.email,
      password: data.password,
      platform: data.platform
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSyncedPasswords = async (passwordDispatch, setSyncing) => {
  try {
    const response = await axios.get("/passwords");
    if (response.data.length > 0) {
      const data = [];
      response.data.forEach(item => data.push({ ...item, synced: true }));
      passwordDispatch({
        type: "SET_PASSWORDS",
        payload: data
      });
      setSyncing(false);
      saveData(data);
    }
  } catch (err) {
    console.log(err);
    setSyncing(false);
  }
};

export const syncData = async (passwords, passwordDispatch) => {
  await Promise.all(
    passwords.map(async pw => {
      if (!pw.synced) {
        try {
          const result = await syncPassword(pw);
          if (result.id) {
            editPassword(passwordDispatch, pw.id, {
              id: result.id,
              synced: true
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    })
  );
};

export const deleteSyncedPassword = id => {
  return axios.delete(`/passwords/${id}`);
};

export const editSyncedPassword = (id, item) => {
  return axios.patch(`/passwords/${id}`, {
    email: item.email,
    password: item.password,
    platform: item.platform
  });
};
