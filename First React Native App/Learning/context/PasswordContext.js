import React, { createContext, useReducer, useContext } from "react";
import { saveData } from "../actions/passwordActions";

const PasswordContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "SET_PASSWORDS":
      return action.payload;
    case "ADD_PASSWORD":
      newState = [...state, action.payload];
      saveData(newState);
      return newState;
    case "EDIT_PASSWORD":
      newState = state.map(pw =>
        pw.id === action.payload.id ? { ...pw, ...action.payload.item } : pw
      );
      saveData(newState);
      return newState;
    case "DELETE_PASSWORD":
      newState = state.filter(pw => pw.id !== action.payload);
      saveData(newState);
      return newState;
    default:
      return state;
  }
};

export const PasswordProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <PasswordContext.Provider value={contextValue}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => {
  const contextValue = useContext(PasswordContext);
  if (!contextValue) throw new Error("Context used out of provider");
  return contextValue;
};
