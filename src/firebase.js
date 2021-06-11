import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var config = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
   measurementId: process.env.REACT_APP_MEASURMENT_ID,
};
// console.log(process.env);

firebase.initializeApp(config);
firebase.firestore();
firebase.storage();

export default firebase;

export const firebaseEndpoints = {
   initializePayment:
      'https://asia-south1-challengemii-website.cloudfunctions.net/initiatePayment',
};
