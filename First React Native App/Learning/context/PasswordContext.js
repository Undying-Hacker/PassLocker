import React, { createContext, useReducer, useContext } from 'react';

const PasswordContext = createContext();

const initialState = [
    {
        email: 'inuyashathanhcongnguyen',
        password: 'singba2001',
        platform: 'Facebook'
    },
    {
        email: 'workerz0022@gmail.com',
        password: 'cong2522001',
        platform: 'Google'
    },
    {
        email: 'adamleveine@gmail.com',
        password: '123456A',
        platform: 'Microsoft'
    }
]

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_PASSWORD':
            return [...state, action.payload]
        case 'EDIT_PASSWORD':
            return [...state.slice(0, action.payload.index), action.payload.item, ...state.slice(action.payload.index + 1,)]
        case 'DELETE_PASSWORD':
            return [...state.slice(0, action.payload), ...state.slice(action.payload + 1,)]
        default: return state
    }
}

export const PasswordProvider = ({ children }) => {
    const contextValue = useReducer(reducer, initialState);
    return (
        <PasswordContext.Provider value={contextValue}>
            {children}
        </PasswordContext.Provider>
    )
}


export const usePassword = () => {
    const contextValue = useContext(PasswordContext);
    if (!contextValue) throw new Error('Context used out of provider');
    return contextValue;
}