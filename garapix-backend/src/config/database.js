const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garapix', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connecté: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Erreur de connexion: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;