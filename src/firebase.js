import * as firebase from 'firebase'; 

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messageingSenderId: "",
    measurementId: ""
};

// Initialize Firebase()
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;