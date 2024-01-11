//Importing Libraries 
require("dotenv").config();
const app = require(".")

/*
  ===============================================================
 Importing the port set on the .env, if the port number is not set on .env or the port is being used by another server
running on the local macchine we are asking the app to use 3000 as the port number 
  ===============================================================
*/
const PORT = process.env.PORT

//Listing to the app and running it on PORT 5000
app.listen(PORT, async () => {
   console.log(`listning on port ${PORT}`)
})

// require('dotenv').config()
// const app = require('.')

// const PORT = process.env.PORT || 3000;

// const mongoose = require('mongoose');

// const MONGODB_URI =
// 'mongodb+srv://precasimantas:fXVEftjq2ibKeUsJ@nodecourse.mcyureh.mongodb.net/memoease?retryWrites=true&w=majority';



// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     app.listen(8080);
//   })
//   .catch((err: any) => {
//     console.log(err);
//   });

// app.listen(PORT, async () => {
//   console.log(`listening on port ${PORT}`)
// })