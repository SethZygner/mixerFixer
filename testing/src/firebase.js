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

let arrayOfUsers = reactive([]);



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



function addUser(data){
    db.collection("Users")
        .doc(auth.currentUser.uid)
        .set(data)
        .catch((err)=>{
            console.log(err.message);
        })

}

async function getAllUsers(arr){
    arr.length = 0;
    await db.collection("Users")
        .get()
        .then((doc)=>{
            doc.forEach((user)=>{
                let singleUser = {
                    Username: user.data().Username,
                    ID: user.data().ID
                }
                arr.push(singleUser);
            })
        })
        .then(()=>{
            return arr;
        })
}

await getAllUsers(arrayOfUsers);


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


export default{
    addUser,
    newUser,
    signOut,
    addApiToFavorites,
    getAllUsers,
    arrayOfUsers,
    db,
    auth
}











