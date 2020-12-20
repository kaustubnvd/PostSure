import firebase from 'firebase/app';
import 'firebase/firestore';
import { main } from './app.js';
import { getLifetime } from './stats.js';

let firebaseConfig = {
    apiKey: 'AIzaSyC1y14eBUEzN7QlmQ3Qw81J8M2H2aUWvOk',
    authDomain: "postsure-db141.firebaseapp.com",
    databaseURL: "https://postsure-db141.firebaseio.com",
    projectId: "postsure-db141",
    storageBucket: "postsure-db141.appspot.com",
    messagingSenderId: "476626995143",
    appId: "1:476626995143:web:dc6810dc481b3076693be2",
    measurementId: "G-L10TQDVVWP"
};

firebase.initializeApp(firebaseConfig);
export let db = firebase.firestore();

export let email = ''; // dynamic in future

let emailInput = document.getElementById("email");
let button = document.getElementById("email-btn");

// error checking needed to make sure it is a valid email
let errorMsg = document.getElementById('email-error');

button.addEventListener('click', () => {
    email = emailInput.value;
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newUser(email);
        // lifetimeArr = getLifetime();
        // lifetimeArr.push(100);
        errorMsg.classList.add('hidden');
        main();
    } else {
        // show the error message 
        errorMsg.classList.remove('hidden');
        console.log("error occured");
    }
})

emailInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        email = emailInput.value;
        newUser(email); 
    }
})

// general update for user param for data
async function newUser(email) {
    let usersRef = await db.collection('users').doc(`${email}`);
    await usersRef.get()
    .then((docSnapshot) => {
    if (!docSnapshot.exists)
        usersRef.set({
            lifetime: [],
            lastSession: []
        });
    }); 
}

// // after a certain amount we add data to DB
// function putCalibration(data) {
//     average();
//     currUser;
// }







