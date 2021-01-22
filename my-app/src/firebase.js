import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyDsWyDiJldpRwr4TjACA72TBUHntw2o85A",
    authDomain: "burger-queen-ed261.firebaseapp.com",
    projectId: "burger-queen-ed261",
    storageBucket: "burger-queen-ed261.appspot.com",
    messagingSenderId: "131131861648",
    appId: "1:131131861648:web:e70b188b1212e17bbd8615",
    measurementId: "G-VGRCQG9ML5"
  };

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;