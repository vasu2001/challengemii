const functions = require('firebase-functions').region('asia-south1');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

// admin
//    .auth()
//    .setCustomUserClaims('PNcYIMcaSPVt4JGtq13J9yHJEK23', { admin: true })
//    .then(() => {
//       console.log('xx');
//    });

exports.initiatePayment = functions.https.onRequest(
   require('./src/InitatePayment'),
);

exports.completePayment = functions.https.onRequest(
   require('./src/completePayment'),
);

exports.submissionTrigger = functions.firestore
   .document('submissions/{docId}')
   .onCreate(require('./src/createSubmissionTrigger'));

exports.requestTrigger = functions.firestore
   .document('redeem_req/{docId}')
   .onCreate(require('./src/createRequestTrigger'));
