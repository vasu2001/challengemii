const PaytmChecksum = require("./PaytmChecksum");
const env = require("../env");
const cors = require("cors")({ origin: true });
const functions = require("firebase-functions");
const { firestore } = require("firebase-admin");

const TICKET_VALUE = 5;

const calcDiscount = (amount) => {
   if (amount < 100) return 0;
   if (amount < 500) return 5;
   if (amount < 1500) return 10;
   if (amount < 2500) return 15;
   return 20;
};

module.exports = (req, res) => {
   cors(req, res, async () => {
      const { ORDERID, TXNAMOUNT, STATUS, CHECKSUMHASH } = req.body;
      delete req.body.CHECKSUMHASH;

      const amount = parseInt(TXNAMOUNT);
      const discount = calcDiscount(amount);
      const tickets = Math.floor(
         ((amount / TICKET_VALUE) * (100 + discount)) / 100,
      );

      try {
         var isVerifySignature = PaytmChecksum.verifySignature(
            req.body,
            env.MERCHANT_KEY,
            CHECKSUMHASH,
         );
         if (!isVerifySignature) {
            firestore().collection("payments").doc(ORDERID).update({
               status: "CHECKSUM_FAILED",
               date: new Date().toISOString(),
            });
            res.redirect(env.REDIRECT_URL);
            return;
         }

         const paymentInfo = (
            await firestore().collection("payments").doc(ORDERID).get()
         ).data();

         firestore().collection("payments").doc(ORDERID).update({
            status: STATUS,
            date: new Date().toISOString(),
         });

         if (STATUS !== "TXN_SUCCESS") {
            res.redirect(env.REDIRECT_URL);
            return;
         }

         firestore()
            .collection("users")
            .doc(paymentInfo.user_id)
            .update({
               tickets: firestore.FieldValue.increment(tickets),
            });

         res.redirect(env.REDIRECT_URL);
      } catch (err) {
         res.send({ error: "some error occured" });
         functions.logger.error("Error ", err);
      }
   });
};
