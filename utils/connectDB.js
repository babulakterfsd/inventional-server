const mongoose = require('mongoose');

async function connectDB() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.polnh.mongodb.net/a_tg_of?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log('Connected to database'.rainbow.bold);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
