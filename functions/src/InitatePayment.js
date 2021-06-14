const PaytmChecksum = require("./PaytmChecksum");
const env = require("../env");
const cors = require("cors")({ origin: true });
const https = require("https");
const functions = require("firebase-functions");
const { firestore } = require("firebase-admin");

module.exports = (req, res) => {
   cors(req, res, async () => {
      const { orderId, value, uid } = req.body;
      if (!orderId || !value || !uid) res.send({ error: "some error occured" });

      var paytmParams = {};
      paytmParams.body = {
         requestType: "Payment",
         mid: env.MERCHANT_ID,
         websiteName: "WEBSTAGING",
         orderId,
         callbackUrl:
            "https://asia-south1-challengemii-website.cloudfunctions.net/completePayment",
         txnAmount: {
            value,
            currency: "INR",
         },
         userInfo: {
            custId: uid,
         },
      };

      try {
         await firestore().collection("payments").doc(orderId).set({
            user_id: uid,
            amount: value,
            status: "STARTED",
            date: new Date().toISOString(),
         });

         const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            env.MERCHANT_KEY,
         );

         paytmParams.head = {
            signature: checksum,
         };

         const post_data = JSON.stringify(paytmParams);

         const options = {
            hostname: env.HOST_NAME,
            path: `/theia/api/v1/initiateTransaction?mid=${env.MERCHANT_ID}&orderId=${orderId}`,
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Content-Length": post_data.length,
            },
         };

         var response = "";
         var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
               response += chunk;
            });

            post_res.on("end", function () {
               // functions.logger.info(JSON.parse(response));
               res.send(response);
            });
         });

         post_req.write(post_data);
         post_req.end();
      } catch (err) {
         res.send({ error: "some error occured" });
         functions.logger.error("Error ", err);
      }
   });
};
