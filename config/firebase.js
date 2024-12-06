var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

try{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });

      const db = admin.firestore();
console.log("firebase working");

}catch(error){
    console.log(error);
}
  
const db = admin.firestore();

module.exports = { admin, db };