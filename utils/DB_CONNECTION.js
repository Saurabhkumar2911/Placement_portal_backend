const mongoose = require("mongoose");
const DB_CONNECTION = () => {
    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on("connected", () => {
        console.log("You are connected");
    });

    mongoose.connection.on("error", () => {
        console.log("error");
    });
};

module.exports = { DB_CONNECTION };