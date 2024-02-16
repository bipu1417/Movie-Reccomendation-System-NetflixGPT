
export const checkValidData = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    if(!isEmailValid){
        return "Email ID is not valid.";
    }
    if(!isPasswordValid) {
        return "Password is not valid.";
    }
    return "";
}


export const checkSignUpData = (email, password, name) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    const isNameValid = /^[A-Z][a-z]+\s[a-zA-Z\s\.]+$/.test(name);

    if(!isEmailValid){
        return "Email ID is not valid.";
    }
    if(!isPasswordValid) {
        return "Password is not valid.";
    }
    if(!isNameValid) {
        return "Name is not valid.";
    }
    return "";
}