import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAJ4FBaJK-iOgIEtA8UDnGb1lvfrf4DhOU",
  authDomain: "authentication-9126a.firebaseapp.com",
  databaseURL: "https://authentication-9126a.firebaseio.com",
  projectId: "authentication-9126a",
  storageBucket: "",
  messagingSenderId: "1009219554120",
  appId: "1:1009219554120:web:8e3eb5eec4ae623c"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
