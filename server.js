const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port  = process.env.PORT || 4000;

app.use(express.json());

// Connect to MongoDB
try{
    const DBConnect = await mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    if(DBConnect){
        console.log('Connected to MongoDB')
      }else{
        console.error('Error connecting to MongoDB:', error);
      }
}catch(error){
    console.log(error);
}
  

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});