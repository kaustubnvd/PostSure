let firebaseConfig = {
    apiKey: "AIzaSyC1y14eBUEzN7QlmQ3Qw81J8M2H2aUWvOk",
    authDomain: "postsure-db141.firebaseapp.com",
    databaseURL: "https://postsure-db141.firebaseio.com",
    projectId: "postsure-db141",
    storageBucket: "postsure-db141.appspot.com",
    messagingSenderId: "476626995143",
    appId: "1:476626995143:web:dc6810dc481b3076693be2",
    measurementId: "G-L10TQDVVWP"
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let emailInput = document.getElementById("email");
let button = document.getElementById("email-btn");

let email = '' // dynamic in future
let currUser;

// error checking needed to make sure it is a valid email

button.addEventListener('click', () => {
    email = emailInput.value;
    currUser = newUser(email);
})
emailInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        email = emailInput.value;
        currUser = newUser(email); 
    }
})


// general update for user param for data
function newUser(email) {
    return db.collection("users").doc(`${email}`).set({});
}




