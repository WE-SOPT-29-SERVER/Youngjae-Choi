const {initializeApp} = require('firebase/app');
const {getAuth} = require('firebase/auth');

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "wesopt29-1d0dd.firebaseapp.com",
    projectId: "wesopt29-1d0dd",
    storageBucket: "wesopt29-1d0dd.appspot.com",
    messagingSenderId: "524592566898",
    appId: "1:524592566898:web:2a49817297a47a288968eb",
    measurementId: "G-WXHMDJ4Z2V"
  };

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

module.exports = {firebaseApp, firebaseAuth, firebaseConfig};