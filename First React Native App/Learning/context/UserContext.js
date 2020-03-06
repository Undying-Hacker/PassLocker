import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  credentials: {},
  authenticated: false,
  theme: "light",
  searchMode: "Platform",
  language: "English",
  lastUser: null,
  isNew: false,
  PIN: "",
  unlocked: false
};

const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        credentials: action.payload
      };
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload
      };
    case "SET_SEARCH_MODE":
      return {
        ...state,
        searchMode: action.payload
      };
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload
      };
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        authenticated: false,
        credentials: {}
      };
    case "SET_LAST_USER":
      return {
        ...state,
        lastUser: action.payload
      };
    case "SET_NEW_USER":
      return {
        ...state,
        isNew: action.payload
      };
    case "SET_PIN":
      return {
        ...state,
        PIN: action.payload
      };
    case "SET_UNLOCKED":
      return {
        ...state,
        unlocked: true
      };
    case "SET_LOCK": {
      return { ...state, unlocked: false };
    }
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const contextValue = useContext(UserContext);
  if (!contextValue) throw new Error("Used outside of provider");
  return contextValue;
};
