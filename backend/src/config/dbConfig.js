const mongoose =require('mongoose');
const { MONGO_URL } = require('./serverConfig');

async function connectDB(){
    try {
        await mongoose.connect(MONGO_URL)
    } catch (error) {
        console.log(error)
    }
}
module.exports=connectDB;