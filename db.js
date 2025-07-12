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
      serverSelectionTimeoutMS: 10000, // Optional: timeout after 10s
    });

    console.log("✅ MongoDB connected successfully to:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection failed:");
    console.error("   →", err.message);

    if (err.message.includes("getaddrinfo ENOTFOUND") || err.message.includes("querySrv EBADNAME")) {
      console.error("💡 Check your connection string: possible typo or unencoded password (@ = %40)");
    }

    process.exit(1);
  }
};

module.exports = connection;
