const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:admin@prerakcluster.tq5ia.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
