const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});


const userTransaction = new mongoose.Schema({
    userid: String,
    username: String,
    clientid: String, 
})

const userWallet = new mongoose.Schema({
    userid: String,
    userTransaction: {},
    username: String,
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
}