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


// returns the document snapshot matching the uid of the logged in user after writing to db
const writeUserData = async (ref, context) => { // WRITES TO DB

    await ref.doc(context.uid).set({
        cards: [],
        currency: 0,
        email: context.email,
        pack_refreshes: Date.now(),
        username: context.email.split("@")[0],
    })

    return ref.doc(context.uid).get();
}

// returns a random integer between [start, end]
const randRange = (start, end) => {
    const range = end - start + 1;
    return Math.floor(Math.random() * range + start);
}

// takes an array with odds
const randWeights = (odds) => {
    let total = 0;
    let res = undefined;

    for (let val of odds) {
        total += val;
    }
    let index = Math.random() * total;

    for (let i = 0; i < odds.length; i++) {
        if (index < odds[i]) {
            res = i;
            break;
        } else {
            index -= odds[i];
        }
    }
    return res;
}

const randStats = (maxi) => {
    //https://www.desmos.com/calculator/lywtrhxgup 
    let exponent=1.3
    const res = Math.floor(Math.pow(Math.random(), exponent) * maxi + 1);
    return res;
}

// retrieve all available cards, ordered by rarity
const getAllCardsByRarity = async () => { // READS DB
    const master_cards_map = new Map();
    const card_list_snapshot = await db.collection('cards').orderBy("rarity").get();
    
    if (!card_list_snapshot.size) {
        logger.error("Unable to get master cards list")
        throw new functions.https.HttpsError('internal', 'internal error')
    }

    card_list_snapshot.forEach((card) => {
        const rarity = card.data().rarity;

        if(!master_cards_map.has(rarity)) {
            master_cards_map.set(rarity, []);
        }
        master_cards_map.get(rarity).push(card.data());
    })

    return master_cards_map;
}

const drawCard = (card_source_map) => {
    const weights = [65, 25, 8, 2]
    let rarity = randWeights(weights) + 1;
    const num_choices = card_source_map.get(rarity).length
    const card = card_source_map.get(rarity)[randRange(0, num_choices-1)]

    for (let attribute in card.attributes) {
        card.attributes[attribute] = randStats(card.attributes[attribute]);
    }

    return card;

}

const updateUserCards = async (uid, old_cards, new_cards) => { // WRITES TO DB
    const ref = db.collection('users');
    const snapshot = await ref.doc(uid).get();

    if(!snapshot.exists) {
        throw new functions.https.HttpsError('internal-error', 'User data was not found')
    } else {
        await ref.doc(uid).update({
            cards: [...old_cards, ...new_cards],
            pack_refreshes: Date.now() + 7000,
        })
    }

    return ref.doc(uid).get();
}

exports.getUserData = onCall(
    {cors: ["*", "localhost:5173"]},
    async (request) => {
    const context = request.data.context;
    if (!context.uid) {
        throw new functions.https.HttpsError('not-found', 'No UID Found!');
    }

    const uid = context.uid;
    let userData = {};
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.doc(context.uid).get();
        if (snapshot.exists) {
            userData = snapshot.data();
        } else {
            userData = writeUserData(usersRef, context).data();
            userData["NEW_ACCOUNT"] = true;
        }
        userData["uid"] = context.uid;
        return userData;
    } catch (error) {
        logger.error("Error fetching user data:", error);
        throw new functions.https.HttpsError('internal', 'Unable to fetch user data', error);
    }
});

exports.openPack = onCall(
    {cors: true},
    async (request) => {
        const uid = request.data.uid;
        const user_data = (await db.collection('users').doc(uid).get()).data();
        const prev_owned_cards = user_data.cards || [];

        if (prev_owned_cards > 100) {
            throw new functions.https.HttpsError('internal-error', 'Too many cards! This restriction will be lifted in the future')
        }
        
        if (user_data.pack_refreshes > Date.now()) {
            throw new functions.https.HttpsError('permission-denied', 'User cannot open a pack at this time.')
        }

        const cards_to_draw = randRange(3,7);
        const master_cards_map = await getAllCardsByRarity();
        const new_cards = [];

        for (let i = 0; i < cards_to_draw; ++i) {
            new_cards.push(drawCard(master_cards_map));
        }
        
        const res = await updateUserCards(uid, prev_owned_cards, new_cards);
        return res.data();
    }
)

//
exports.infuse = onCall(
    {cors: true},
    async (request) => {
        /*
        card: {
            card.attributes
            card.name
            card.description
            card.collection
            card.rarity
        }
        */
        const uid = request.data.uid;
        const original_idx = request.data.original_idx;
        const sacrifice_idx = request.data.sacrifice_idx;
        if(original_idx === sacrifice_idx) {
            throw new functions.https.HttpsError('permission-denied', 'Cards cannot be the same instance')
        }

        const ref = db.collection('users');
        const original_snapshot = await ref.doc(uid).get();
        let cards = original_snapshot.data().cards;
        const original_card = cards[original_idx];
        const sacrifice_card = cards[sacrifice_idx];

        if (original_card.name !== sacrifice_card.name) {
            throw new functions.https.HttpsError('permission-denied', 'Cards are not the same')
        }

        for (key in original_card.attributes) {
            original_card.attributes[key] = Math.max(original_card.attributes[key], sacrifice_card.attributes[key])
        }

        cards[original_idx] = original_card;
        cards.splice(sacrifice_idx, 1);
        await ref.doc(uid).update({cards});

        const res = (await ref.doc(uid).get()).data();
        res["uid"] = uid;
        return res;
    }
)

exports.helloWorld = onRequest(
    {cors: true},
    (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});