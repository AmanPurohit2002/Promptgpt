import mongoose from "mongoose";

let isDbConnected = false;

const connectedToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isDbConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "share-prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isDbConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectedToDb;
