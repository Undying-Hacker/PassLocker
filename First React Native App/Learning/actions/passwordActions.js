export const addPassword = (passwordDispatch, item) => {
    return passwordDispatch({
        type: 'ADD_PASSWORD',
        payload: item
    });
}

export const editPassword = (passwordDispatch, index, item) => {
    return passwordDispatch({
        type: 'EDIT_PASSWORD',
        payload: {
            index,
            item
        }
    });
}

export const deletePassword = (passwordDispatch, index) => {
    return passwordDispatch({
        type: 'DELETE_PASSWORD',
        payload: index
    });
}