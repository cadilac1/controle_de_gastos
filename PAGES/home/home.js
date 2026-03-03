import {getAuth, signOut, onAuthStateChanged} from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwzQt_QEcYJNowfX29HPe2ulR1PDvKViA",
    authDomain: "controle-de-gastos-53564.firebaseapp.com",
    projectId: "controle-de-gastos-53564",
    storageBucket: "controle-de-gastos-53564.firebasestorage.app",
    messagingSenderId: "36769424701",
    appId: "1:36769424701:web:4f830853d6f6c898925154"
  };

import {app} from "../../index.js";

const auth = getAuth(app);

function logout() {
    signOut(auth).then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert("erro ao fazer logout");
    });
}

onAuthStateChanged(auth, (user) => {
    if(!user) {
        window.location.replace("../../index.html");
    }
});

findTransaction();

function findTransaction() {
    setTimeout(() => {
        addTransactionsToScreen(fakeTransactions);
    }, 1000)
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById("transactions");

    transactions.forEach(transactions => {
        const li = document.createElement('li');
        li.classList.add(transactions.type);
        orderedList.appendChild(li);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transactions.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transactions.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transactions.transactionType;
        li.appendChild(type);

        if (transactions.description) {
            const description = document.createElement('p');
            description.innerHTML = transactions.description;
            li.appendChild(description);
        }
        
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}
    


    const fakeTransactions = [{
        type: 'expense',
        date: '2022-01-04',
        money: {
            currency: 'R$',
            value: 10
        },
        transactionType: 'mercadinho'
    }, {
        type: 'income',
        date: '2600-01-03',
        money: {
            currency: 'R$',
            value: 10
        },
        transactionType: 'salário',
        description: ' hold up'
    }, {
        type: 'expense',
        date: '2600-02-01',
        money: {
            currency: 'EUR',
            value: 100
        },
        transactionType: 'transporte',
        description: 'metrô de primeiro mundo'
    }, {
        type: 'expense',
        date: '2600-01-04',
        money: {
            currency: 'U$D',
            value: 13
        },
        transactionType:'aluguel',
        description:'devendo'
    }]

window.logout = logout;
window.findTransaction = findTransaction;
window.addTransactionsToScreen = addTransactionsToScreen;                    