const form = {
    confirmPassword: () => document.getElementById("confirmPassword"),
    confirmPasswordDoesntMatchError: () => document.getElementById("password-doesnt-match-error"),
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    password: () => document.getElementById("password"),
    PasswordRequiredError: () => document.getElementById("password-required-error"),
    PasswordMinLengthError: () => document.getElementById("password-min-length-error"),
    registerButton: () => document.getElementById("register-button")
};

form.email().addEventListener("change", OnChangeEmail);
form.password().addEventListener("change", OnChangePassword);
form.confirmPassword().addEventListener("change", OnChangeConfirmPassword);

import {getAuth, onAuthStateChanged} from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const auth = getAuth(app);

function OnChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonsDisable();

}

function OnChangePassword() {
    const password = form.password().value;
    form.PasswordRequiredError().style.display = password ? "none" : "block";

    form.PasswordMinLengthError().style.display = password.length >=6 ? "none" : "block";

    validatePasswordsMatch();

    toggleRegisterButtonsDisable();
}

function OnChangeConfirmPassword() {
    validatePasswordsMatch();

    toggleRegisterButtonsDisable();
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display = 
    password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonsDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if(!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if(password != confirmPassword){
        return false;
    }

    return true;
}

import {createUserWithEmailAndPassword, signInWithEmailAndPassword}
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {app} from "../../index.js";

function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;

    createUserWithEmailAndPassword(auth, email, password
    ).then(Response => {
        hideLoading();
        window.location.href = "../../index.html"

    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error){
    if(error.code == "auth/email-already-in-use") {
        return "email em uso";
    }
        return error.message;
}


function login2() {
    window.location.href = "../../index.html"
    }



window.register = register;
window.login2 = login2;