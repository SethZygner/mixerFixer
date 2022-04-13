import { initializeApp } from "firebase/app";
import "firebase/firestore";
import firebase from "firebase/compat";
import {ref, reactive} from "vue";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import 'firebase/compat/auth';


const config = {
    apiKey: "AIzaSyCucMeDhjzc8ajC4hmbkyeIJMiK8FzB5wI",
    authDomain: "mix-fix-c249a.firebaseapp.com",
    projectId: "mix-fix-c249a",
    storageBucket: "mix-fix-c249a.appspot.com",
    messagingSenderId: "363788299619",
    appId: "1:363788299619:web:a03164d1075ec822d3f756",
    measurementId: "G-0FQGWW10WH"
};

firebase.initializeApp(config);


let db = firebase.firestore();
let auth = getAuth();

//Authorization functions
function newUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .catch((err)=>{
            alert(err.message);
        })
}
function signOut(){
    auth.signOut();
}
function signIn(email, password){
    signInWithEmailAndPassword(auth, email, password)
        .catch((err)=>{
            alert(err.message);
        })
}
function addUser(data){
    db.collection("Users")
        .doc(auth.currentUser.uid)
        .set(data)
        .catch((err)=>{
            console.log(err.message);
        })

}
async function checkIfUserIsSignedIn(){
    return auth.currentUser !== null;
}


//Chat functions
//TODO: Add cloud storage when possible for image uploads
function commentOnAPIDrink (itemID, userID, comment){
    db.collection("API Item Info")
        .doc(itemID)
        .collection("Comments")
        .doc()
        .set(
            {
                UID: userID,
                UserComment: comment
            })
        .catch((err) => {
            alert(err.message);
        })
}

/*
async function getAllInfo(){
    const snapshots = await db.collection("Users").get()
    console.log(snapshots.docs.map(doc => doc.data().Username));
}
 */


//Favorites functions
function addApiToFavorites(docID){
    if(auth.currentUser !== null){
        db.collection("Users")
            .doc(auth.currentUser.uid)
            .collection("Favorites")
            .doc(docID)
            .set({
                    DrinkId: docID
                }
            ).catch((err)=>{
            console.log(err.message);
        })
    }else{
        alert("Sign in to add to favorites!")
    }
}


export default{
    addUser,
    newUser,
    signOut,
    signIn,
    checkIfUserIsSignedIn,
    auth
}











