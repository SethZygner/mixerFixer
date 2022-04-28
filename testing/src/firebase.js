import "firebase/firestore";
import firebase from "firebase/compat";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import 'firebase/compat/auth';
import {reactive, ref} from "vue";


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
let auth = reactive(getAuth());




//Authorization functions
function newUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .catch((err)=>{
            alert(err.message);
        })
}
function signOut(){
    auth.signOut().then(r => console.log(r));
}
function signIn(email, password){
    signInWithEmailAndPassword(auth, email, password)
        .then((result)=>{
            console.log(result);
            console.log(auth.currentUser.uid);
        })
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


//Favorites functions
function addApiToFavorites(docId, drink){
    if(auth.currentUser !== null){
        db.collection("Users")
            .doc(auth.currentUser.uid)
            .collection("APIFavorites")
            .doc(docId)
            .set(drink)
            .catch((err)=>{
            console.log(err.message);
        })
    }else{
        alert("Sign in to add to favorites!")
    }
}

let checkBoolean = ref(true);





export default{
    addUser,
    newUser,
    signOut,
    signIn,
    addApiToFavorites,
    db,
    auth
}











