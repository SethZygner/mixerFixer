import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/*import * as firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDqsXEFGrY3RNd0N8Qf0yZYAZyLzu3yBC0",
    authDomain: "mixerfixer-6ff23.firebaseapp.com",
    projectId: "mixerfixer-6ff23",
    storageBucket: "mixerfixer-6ff23.appspot.com",
    messagingSenderId: "1030060495894",
    appId: "1:1030060495894:web:185025e04985ff346d1137",
    measurementId: "G-86RVDYK3KN"
};

firebase.initializeApp(firebaseConfig);*/


const app = createApp(App);

app.use(router);

app.mount("#app");
