import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
    authenticated: false,
    credentials: {},
    theme: 'light',
    searchMode: 'Platform',
    language: 'English'
}

const UserContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                authenticated: true
            }
        case 'SET_USER':
            return action.payload
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_SEARCH_MODE':
            return {
                ...state,
                searchMode: action.payload
            }
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload
            }
        case 'SET_UNAUTHENICATED':
            return {
                ...state,
                authenticated: false
            }
    }
}

export const UserProvider = ({ children }) => {
    const contextValue = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const contextValue = useContext(UserContext);
    if (!contextValue) throw new Error('Used outside of provider');
    return contextValue;
}