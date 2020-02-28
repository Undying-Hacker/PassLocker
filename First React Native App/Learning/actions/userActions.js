export const setTheme = (userDispatch, theme) => {
    userDispatch({
        type: 'SET_THEME',
        payload: theme
    });
}

export const setSearchMode = (userDispatch, searchMode) => {
    userDispatch({
        type: 'SET_SEARCH_MODE',
        payload: searchMode
    });
}

export const setLanguage = (userDispatch, language) => {
    userDispatch({
        type: 'SET_LANGUAGE',
        payload: language
    });
}