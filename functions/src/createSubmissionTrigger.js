const admin = require('firebase-admin');
const moment = require('moment');
const functions = require('firebase-functions');

const db = admin.firestore();

module.exports = async (snap, context) => {
   try {
      const { user_id, competition_id, referBy } = snap.data();

      const { starts, refer, fees, preregis } = (
         await db.collection('competitions').doc(competition_id).get()
      ).data();

      const dec =
         parseInt(
            moment().diff(moment(starts, 'YYYY-MM-DD')) > 0 ? fees : preregis,
         ) - referBy
            ? 1
            : 0;

      db.collection('users')
         .doc(user_id)
         .update({
            tickets: admin.firestore.FieldValue.increment(-1 * dec),
         });

      if (referBy) {
         const bonus = parseInt(refer);
         db.collection('users')
            .doc(referBy)
            .update({
               tickets: admin.firestore.FieldValue.increment(bonus),
            });
      }
   } catch (err) {
      functions.logger.error(err);
   }
};
