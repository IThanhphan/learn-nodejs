const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://thanhphanscpy2005:SDu6Q0gT2LQAoyKa@cluster0.r9reoxg.mongodb.net/learn-db');
        console.log('connect');
    } catch(error) {
        console.log('fail');
    }
}

module.exports = { connect };