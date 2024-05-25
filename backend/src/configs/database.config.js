import mongoose from "mongoose";

// Database configuration
const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const databaseName = process.env.DATABASE_NAME;
    const connectionUrl = `${mongoUrl}/${databaseName}`;

    const instance = await mongoose.connect(connectionUrl);
    console.log(`😊 Database connected to HOST :: ${instance.connection.host}`);
    return instance;
  } catch (error) {
    console.log(`😒 Error connecting Database :: ${error.message}`);
  }
};

export default connectDB;
