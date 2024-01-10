const express = require('express');

const mongoose = require('mongoose');

const MONGODB_URI =
'mongodb+srv://precasimantas:fXVEftjq2ibKeUsJ@nodecourse.mcyureh.mongodb.net/memoease?retryWrites=true&w=majority';

const app = express();

app.use('/', (req,res,next) =>{
    res.status(200).json({message: 'Hello'})
})

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
