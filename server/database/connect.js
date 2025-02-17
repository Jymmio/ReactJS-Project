const mongoose = require('mongoose');
async function connectToDB(){
    const URL = process.env.MONGODB_URL;
    try{
        await mongoose.connect(URL);
        console.log("connected successfully to databse !");
    } catch(error) {
        console.log("error while trying to connect to DB");
    }
}

module.exports = { connectToDB };