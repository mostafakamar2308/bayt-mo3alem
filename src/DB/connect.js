import mongoose from "mongoose";

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected tomongodb");
  } catch (e) {
    console.error("Couldn't connect to Mongo");
  }
}

export default dbConnect;
