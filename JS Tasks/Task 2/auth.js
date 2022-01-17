const firebaseConfig = {
    apiKey: "AIzaSyDF5bzFknX5oQ-XBkFdLscs4U3y_SA1Fyo",
    authDomain: "survey-app-a4505.firebaseapp.com",
    projectId: "survey-app-a4505",
    storageBucket: "survey-app-a4505.appspot.com",
    messagingSenderId: "45341949465",
    appId: "1:45341949465:web:91fddcede53ea022953488"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = app.firestore();

//checking the authentication state of the user if signed in/out

auth.onAuthStateChanged(user => {
    if (user) {
        setDashboard(user);
        localStorage.setItem('userEmail', user.email);
    } else {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('serveyInfo');
        window.location = './signin.html'

    }
});

// signup function

const signupFunc = async () => {
    event.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            // console.log(user);
            // Add a new document in collection "admin"
            db.collection("admin").doc(user.uid).set({
                email: user.email,
                uid: user.uid,
                admin: true
            })
                .then(() => {
                    setDashboard(user);
                    console.log("Document successfully written!");
                    window.location  = "./dashboard.html";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

        })
        .catch((error) => {
            document.querySelector('.error-box').innerHTML = error;
        });
}

//signin function

const signinFunc = async () => {
    event.preventDefault();
    const email = document.querySelector('#signin-email').value;
    const password = document.querySelector('#signin-password').value;
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            // console.log(user);
            window.location  = "./dashboard.html";
        })
        .catch((error) => {
            document.querySelector('.error-box').innerHTML = error;
        });
}

const setDashboard = async(user) =>{

    let userEmail = document.querySelector('#user-email');

    await db.collection("admin").doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            userEmail.innerHTML = doc.data().email;
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

const logout = () => {
    // e.preventDefault();
    firebase.auth().signOut().then(() => {
        console.log("signed out");
        window.location  = './signin.html';
    }).catch((error) => {
        console.log(error);
    });
}



