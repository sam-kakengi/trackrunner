/**
 * Validates an email address.
 *
 * @param {string} email - The email address to be validated.
 * @returns {boolean} - Returns true if the email address is valid, otherwise returns false.
 */
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export default validateEmail