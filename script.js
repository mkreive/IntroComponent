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

const checkFirstName = (name) => {
    let valid = false;
    const min = 3,
        max = 25;
    const firsName = name.value.trim();

    if (!isRequired(firsName) || !isBetween(firsName.length, min, max)) {
        let placeholder = "John";
        let errorMessage = "First Name cannot be empty";
        showError(name, placeholder, errorMessage);
    } else {
        showSuccess(name);
        valid = true;
    }
    return valid;
};

const checkLastName = (name) => {
    let valid = false;
    const min = 3,
        max = 25;
    const lastName = name.value.trim();

    if (!isRequired(lastName) || !isBetween(lastName.length, min, max)) {
        let placeholder = "Smith";
        let errorMessage = "Last Name cannot be empty";
        showError(name, placeholder, errorMessage);
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
        let placeholder = "email@email.com";
        let errorMessage = "Looks like this is not an email";
        showError(emailAddress, placeholder, errorMessage);
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
        let placeholder = "Password123";
        let errorMessage =
            "Password must be at least 8 characters long and include number";
        showError(passwordSubmitted, placeholder, errorMessage);
    } else {
        showSuccess(passwordSubmitted);
        valid = true;
    }
    return valid;
};

// ERROR OR SUCESS CLASSES
const showError = (input, placeholder, errorMessage) => {
    const formField = input;

    let inputErrorMessage = document.createElement("span");
    inputErrorMessage.classList.add("error-message");
    inputErrorMessage.textContent = errorMessage;
    formField.after(inputErrorMessage);

    formField.classList.remove("input__success");
    formField.classList.add("error");

    formField.placeholder = placeholder;
};
const showSuccess = (input) => {
    const formField = input;
    formField.classList.remove("error");
    formField.classList.add("input__success");
};

// LISTENER
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isFirstNameValid = checkFirstName(firstName),
        isLastNameValid = checkLastName(lastName),
        isEmailValid = checkEmail(emailEl),
        isPasswordValid = checkPassword(passwordEl);

    let isFormValid =
        isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;

    if (isFormValid) {
        let allInputs = e.target.querySelectorAll(".input__success");
        allInputs.forEach((input) => {
            input.value = "";
        });
    }
});
