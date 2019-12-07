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

const AddRequest = (data, number) => {
  db.collection().add({
    number: number,
    data: data
  });
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  twiliohook: functions.https.onRequest((req, res) => {
    console.log(req.body.From, req.body.Body);
    AddRequest(req.body.Body, req.body.From);
  })
};
