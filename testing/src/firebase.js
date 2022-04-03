import { initializeApp } from "firebase/app";
import "firebase/firestore";
import firebase from "firebase/compat";
import { getAuth } from "firebase/auth";
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



//Store data by making/using an existing collection
function addThing(coll, data){
    db.collection(coll)
        .add(data)
        .then((doc)=>{
            console.log(doc.id);
        })
}




export default{
    addThing
}











