"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const bcrypt = require("bcrypt");
const app = express();

fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = "sUperpassw0rd!";
const someOtherPlaintextPassword = "pass123";

//START_ASYNC -do not remove notes, place code between correct pair of notes.

bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  console.log(hash);

  //Compare hash password, expected to match
  bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
    if (result) console.log(myPlaintextPassword + "  ----> matches hash in DB");
  });

  //Compare hash password, expected to fail
  bcrypt.compare(someOtherPlaintextPassword, hash, (err, result) => {
    if (!result)
      console.log(
        someOtherPlaintextPassword + " ----> do not match hash in DB"
      );
  });
});

//END_ASYNC

//START_SYNC
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log("Sync hashed password: --->:", hash);

const result1 = bcrypt.compareSync(myPlaintextPassword, hash);
const result2 = bcrypt.compareSync(someOtherPlaintextPassword, hash);
// Log the resulting hash to the console
console.log("Synchronously hashed password:", hash);

// Compare the hashed password with plaintext, expected to match

if (result1) {
  console.log(myPlaintextPassword + "  ----> matches hash in DB");
} else {
  console.log(myPlaintextPassword + "  ----> does not match hash in DB");
}

// Compare the hashed password with another plaintext, expected to fail
if (!result2) {
  console.log(someOtherPlaintextPassword + " ----> does not match hash in DB");
} else {
  console.log(someOtherPlaintextPassword + " ----> matches hash in DB");
}
//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
