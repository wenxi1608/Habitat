const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const docucmentReference = db.collection("users").doc("eugene");

const test = async () => {
  await docucmentReference.set({
    first: "eugene",
    last: "oei",
    born: 1815,
    age: 33,
    email: "eugene@email.com",
  });
};

test();
