const mongoose = require('mongoose');

const connectDB = async (URL) => {
    mongoose.connect(URL).then(() => {
        console.log('connection established');
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = connectDB;