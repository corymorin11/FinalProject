const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
  const { email, uid } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({ email })
    .catch(console.error);
};

const AddRequest = (message, from, list) => {
  if (list === "1") {
    db.collection("grocery-orders").add({ message: message, from: from });
  } else if (list === "2") {
    db.collection("office-orders").add({ message: message, from: from });
  } else if (list === "3") {
    db.collection("grocery-photos").add({ message: message, from: from });
  } else if (list === "4") {
    db.collection("office-photos").add({ message: message, from: from });
  }
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  twiliohook: functions.https.onRequest((req, res) => {
    console.log(req.body.From, req.body.Body);
    AddRequest(req.body.message, req.body.from, req.body.list);
  })
};
