export const isEmtyString = (s) => s.trim().length === 0;
export const validateAccount = (data) => {
    let errors = [];
    if (isEmtyString(data.email)) errors.push('Email should not be empty');
    else if (isEmtyString(data.password)) errors.push('Password should not be empty');
    else if (isEmtyString(data.platform)) errors.push('Platform should not be empty');
    return { errors, valid: errors.length === 0}
}