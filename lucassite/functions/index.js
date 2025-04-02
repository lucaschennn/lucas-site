/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Dependencies for callable functions.
const {onCall, HttpsError, onRequest} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");

// Dependencies for the addMessage function.
const {getDatabase} = require("firebase-admin/database");

// // Suggested code may be subject to a license. Learn more: ~LicenseLog:4008740532.
// // Suggested code may be subject to a license. Learn more: ~LicenseLog:3351593768.
const admin = require('firebase-admin');
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

admin.initializeApp();
const db = getFirestore();

exports.getUserData = onCall(
    { cors: true},
    async(request) => {
    const context = request.data.context;
    if (!context.uid) {
        throw new functions.https.HttpsError('not-found', 'No UID Found!');
    }

    const uid = context.uid;
    const userData = [];
    try {
        const usersRef = db.collection('users')
        const snapshot = await usersRef
                .where("uid", "==", uid)
                .get()
        if (snapshot.empty) {
            throw new functions.https.HttpsError('not-found', 'User data not found.');
        }

        snapshot.forEach(doc => {
            userData.push(doc.data());
        })

        return userData;
    } catch (error) {
        logger.error("Error fetching user data:", error);
        throw new functions.https.HttpsError('internal', 'Unable to fetch user data', error);
    }
});

exports.helloWorld = onRequest(
    {cors: true},
    (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});