import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBqYdlrB62g5-UveiaxnMQDMxVmuz073t0",
  authDomain: "final-project-e443b.firebaseapp.com",
  databaseURL: "https://final-project-e443b.firebaseio.com",
  projectId: "final-project-e443b",
  storageBucket: "final-project-e443b.appspot.com",
  messagingSenderId: "1059890768837",
  appId: "1:1059890768837:web:4ad37dedb9e4beb8a1f9ac"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export function snapshotToArray(snapshot) {
  const updated_array = [];
  snapshot.forEach(s => {
    const data = s.data();
    data.id = s.id;
    updated_array.push(data);
  });

  return updated_array;
}
