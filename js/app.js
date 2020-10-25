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

// error checking needed to make sure it is a valid email

button.addEventListener('click', () => {
    email = emailInput.value;
    newUser(email);
    pushStats([1, 2, 3, 4, 5], 10);
})
emailInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        email = emailInput.value;
        newUser(email); 
        pushStats([1, 2, 3, 4, 5], 10);
    }
})


// general update for user param for data
async function newUser(email) {
    await db.collection("users").doc(`${email}`).set({
        "lifetime": [],
        "lastSession": []
    });
}


// after a certain amount we add data to DB
function putCalibration(data) {
    average();
    currUser;
}

async function pushStats(currData, total) {
    await db.collection("users").doc(`${email}`).update({
        "lifetime": firebase.firestore.FieldValue.arrayUnion(total),
    });
    await db.collection("users").doc(`${email}`).set({
        "lastSession": currData
    },
    { 
        merge: true 
    });
}




