const validatePassword = (password) => {
    // At least 8 characters, at least one uppercase, one lowercase, one number, and optionally special characters.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*)[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,}$/;
    return passwordRegex.test(password);
};
export default validatePassword