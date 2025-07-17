// db.js

require('dotenv').config(); // Load environment variables
const mongoose = require("mongoose");

const connection = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI is missing. Please check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:");
    console.error("   →", err.message);

    if (err.message.includes("read ECONNRESET")) {
      console.error("🔁 The connection was reset. Possible network or Atlas config issue.");
      console.error("💡 Ensure your IP is whitelisted and MongoDB Atlas is accessible.");
    } else if (err.message.includes("getaddrinfo ENOTFOUND") || err.message.includes("querySrv EBADNAME")) {
      console.error("💡 Check your connection string. Possibly a typo or missing SRV protocol.");
    }

    process.exit(1);
  }
};

module.exports = connection;
