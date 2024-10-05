/**
 * Validates an email address.
 * 
 * @param {string} email - The email address to be validated.
 * @returns {string} - An error message if the email is invalid, otherwise an empty string.
 */
const validateEmail = (email) => {
    if (!email) {
        return "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return "Please enter a valid email address"
    }
    return ''
}

/**
 * Validates the password.
 *
 * @param {string} password - The password to be validated.
 * @returns {string} - An error message if the password is empty, otherwise an empty string.
 */
const validatePassword = (password) => {
    if (!password) {
        return "Password is required"
    }
    return ''
}

/**
 * Validates the login form.
 *
 * @param {string} email - The email address to validate.
 * @param {string} password - The password to validate.
 * @returns {Object} - An object containing the validation result and any errors.
 * @property {boolean} isValid - Indicates whether the form is valid or not.
 * @property {Object} errors - An object containing any validation errors.
 * @property {string|null} errors.email - The validation error message for the email field, or null if there are no errors.
 * @property {string|null} errors.password - The validation error message for the password field, or null if there are no errors.
 */
const validateLoginForm = (email, password) => {
    let errors = {
        email: validateEmail(email),
        password: validatePassword(password),
    }

    let isValid = !errors.email && !errors.password

    return { isValid, errors }
}

export default validateLoginForm