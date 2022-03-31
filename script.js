"use strict";

// SELECTORS
const form = document.getElementById("submitForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const passwordEl = document.getElementById("password");
const emailEl = document.getElementById("email");
const address = document.getElementById("address");
const formField = document.querySelectorAll(".formField");

// VALIDATIONS

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[0-9])(?=.{8,})");
    return re.test(password);
};

const checkUsername = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const username = firstName.value.trim();

    if (!isRequired(username)) {
        console.log(firstName, "Username cannot be blank.");
    } else if (!isBetween(username.length, min, max)) {
        console.log(
            firstName,
            `Username must be between ${min} and ${max} characters.`
        );
    } else {
        showSuccess(firstName);
        valid = true;
    }
    return valid;
};
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        console.log(emailEl, "Email cannot be blank.");
    } else if (!isEmailValid(email)) {
        console.log(emailEl, "Email is not valid.");
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};
const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, "Password cannot be blank.");
    } else if (!isPasswordSecure(password)) {
        console.log(
            passwordEl,
            "Password must has at least 8 characters that include at least 1 number"
        );
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

// ERROR OR SUCESS CLASSES
const showError = (input, message) => {
    const formField = input;

    formField.classList.remove("input__success");
    formField.classList.add("error");

    formField.textContent = "wrong";
};
const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove("error");
    formField.classList.add("input__success");

    input.textContent = "";
};

// LISTENER
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid;

    if (isFormValid) {
        console.log("form is valid");
    }
});
