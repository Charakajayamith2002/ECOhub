const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(` Database connected: ${connection.connection.host}`);

    } catch (error) {
        console.log("Error connecting to the database", error.message);
        process.exit(1); // 1 => exit with failure
    }
}

module.exports = { connectDB };