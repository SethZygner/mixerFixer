import "firebase/firestore";
import firebase from "firebase/compat";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
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


let signedIn = ref(false);
let db = firebase.firestore();
let auth = reactive(getAuth());
let userId = ref("");

let arrayOfUsers = reactive([]);



onAuthStateChanged(auth, ()=>{
    signedIn.value = auth.currentUser !== null;
})




//Authorization functions
function newUser(email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .catch((err)=>{
            alert(err.message);
        })

}
function signOut(){
    auth.signOut().then(()=>{
        signedIn.value = false;
    });
}


function setProfileId(userID){
    userId.value = userID;

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
console.log(arrayOfUsers);



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

function addUserDrinkToFavorites(drinkID, drinkInfo){
    db.collection("Users")
        .doc(auth.currentUser.uid)
        .collection("UserFavorites")
        .doc(drinkID)
        .set(drinkInfo)
}




export default{
    addUser,
    newUser,
    signOut,
    addApiToFavorites,
    addUserDrinkToFavorites,
    getAllUsers,
    signedIn,
    setProfileId,
    userId,
    arrayOfUsers,
    db,
    auth
}











