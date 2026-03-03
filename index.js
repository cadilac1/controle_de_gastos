const form = {
        email: () => document.getElementById("email"),
        password: () => document.getElementById("password"),
        passwordRequiredError: () => document.getElementById("password-required-error"),
        emailRequiredError: () => document.getElementById("email-required-error"),
        emailInvalidError: () => document.getElementById("email-invalid-error"),
        recuperarSenha: () => document.getElementById("recuperar-senha"),
        logarConta: () => document.getElementById('logar-conta')
    } 

import { 
    signInWithEmailAndPassword,
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

    
    const firebaseConfig = {
    apiKey: "AIzaSyAwzQt_QEcYJNowfX29HPe2ulR1PDvKViA",
    authDomain: "controle-de-gastos-53564.firebaseapp.com",
    projectId: "controle-de-gastos-53564",
    storageBucket: "controle-de-gastos-53564.firebasestorage.app",
    messagingSenderId: "36769424701",
    appId: "1:36769424701:web:4f830853d6f6c898925154"
  };

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

export const app = initializeApp(firebaseConfig);

    import {getAuth} from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const auth = getAuth(app);

function OnChangeEmail() {
        toggleButtonsDisable();

        toggleEmailErrors();
    }

function OnChangePassword() {
    toggleButtonsDisable();
    
    togglePasswordErrors();
}


    function isEmailValid() {
        const email = form.email().value;
        if (!email) {
            return false;
        }
        return validateEmail(email);

    }

    function register() {
        window.location.href="pages/register/register.html";
    }


    function toggleEmailErrors() {
       const email = form.email().value;
        form.emailRequiredError().style.display = email ? "none" : "block";

        form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    }

    function toggleButtonsDisable() {
        const EmailValid = isEmailValid();
        form.recuperarSenha().disabled = !EmailValid;

        const PasswordValid = isPasswordValid();
       form.logarConta().disabled = !EmailValid || !PasswordValid;
    }

    function togglePasswordErrors() {
        const password = form.password().value;
        form.passwordRequiredError().style.display = password ? "none" : "block";

    }

    function isPasswordValid() {
        const password = form.password().value;
        if (!password) {
            return false;
        }
        return true;
    }
    

    function login() {
        showLoading();
  signInWithEmailAndPassword(auth, form.email().value, form.password().value
    ).then(Response =>{
        hideLoading();
    console.log("sucess", Response)
    window.location.href = "pages/home/home.html";
  }).catch(error => {
    hideLoading();
    console.log("error", error)
    alert (getErrorMessage(error));
  });
}

document.addEventListener('keydown', function(e) {
    if(e.key == "Enter"){
        document.getElementById("registrar-conta").click();
    }
});

    function getErrorMessage(error) {
       if (error.code == "auth/invalid-credential"){
          return "Usuário não achado men";
       } 
       return error.message;
    }

    function recoverPassword() {
        showLoading();
        sendPasswordResetEmail(auth, form.email().value).then(() => {
            hideLoading();
            alert("e-mail enviado no seu e-mail! (se o email existir no sistema email) eamail");
        }).catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
    }

window.OnChangeEmail = OnChangeEmail;
window.OnChangePassword = OnChangePassword;
window.register = register;
window.login = login;
window.recoverPassword = recoverPassword;

    

    