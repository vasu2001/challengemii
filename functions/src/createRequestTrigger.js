const admin = require("firebase-admin");
const functions = require("firebase-functions");

const db = admin.firestore();

module.exports = async (snap, context) => {
   try {
      const { user_id, coins } = snap.data();
      const dec = parseInt(coins);

      db.collection("users")
         .doc(user_id)
         .update({
            coins: admin.firestore.FieldValue.increment(-1 * dec),
         });
   } catch (err) {
      functions.logger.error(err);
   }
};
