"use strict";

// SELECTORS
const form = document.getElementById("submitForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const passwordEl = document.getElementById("password");
const emailEl = document.getElementById("email");
const addressEl = document.getElementById("address");
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

const checkUsername = (name) => {
    let valid = false;
    const min = 3,
        max = 25;
    const username = name.value.trim();

    if (!isRequired(username) || !isBetween(username.length, min, max)) {
        let message = "Smith";
        showError(name, message);
    } else {
        showSuccess(name);
        valid = true;
    }
    return valid;
};
const checkEmail = (emailAddress) => {
    let valid = false;
    const email = emailAddress.value.trim();
    if (!isRequired(email) || !isEmailValid(email)) {
        let message = "email@email.com";
        showError(emailAddress, message);
    } else {
        showSuccess(emailAddress);
        valid = true;
    }
    return valid;
};
const checkPassword = (passwordSubmitted) => {
    let valid = false;
    const password = passwordSubmitted.value.trim();
    if (!isRequired(password) || !isPasswordSecure(password)) {
        let message =
            "Must contain at least one number and be 8 characters long";
        showError(passwordSubmitted, message);
    } else {
        showSuccess(passwordSubmitted);
        valid = true;
    }
    return valid;
};

// ERROR OR SUCESS CLASSES
const showError = (input, message) => {
    const formField = input;
    formField.classList.remove("input__success");
    formField.classList.add("error");
    formField.textContent = message;
};
const showSuccess = (input) => {
    const formField = input;
    formField.classList.remove("error");
    formField.classList.add("input__success");
    input.value = "";
};

// LISTENER
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isFirstNameValid = checkUsername(firstName),
        isLastNameValid = checkUsername(lastName),
        isEmailValid = checkEmail(emailEl),
        isPasswordValid = checkPassword(passwordEl),
        isAddressValid = checkUsername(addressEl);

    let isFormValid =
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isAddressValid;

    if (isFormValid) {
        console.log("form is valid");
    }
});
