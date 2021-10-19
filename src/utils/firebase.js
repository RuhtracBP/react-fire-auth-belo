import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({ 
    apiKey: "AIzaSyDI5iqoyx1lEiF4QY0OhpiUKFicFfp88jg",
    authDomain: "titatest-auth-dev.firebaseapp.com",
    projectId: "titatest-auth-dev",
    storageBucket: "titatest-auth-dev.appspot.com",
    messagingSenderId: "632105573816",
    appId: "1:632105573816:web:f86b3669e91bd2e236034d"
 });

export const auth = firebase.auth();


export function updateProfileName(userV, name) {
    //console.log(user);
    const user = firebase.auth().currentUser;
    user.updateProfile( {displayName: {name}})
        .then(() => {
            //console.log("foi");
        }).catch((error) =>{
            //console.log("nao foi")
        })
}

export function updateUserEmail(userV, email) {
    //console.log(user);
    const user = firebase.auth().currentUser;
    user.updateEmail( {email})
        .then(() => {
            //console.log("foi");
        }).catch((error) =>{
            //console.log("nao foi")
        })
}