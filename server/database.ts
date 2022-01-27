import mongoose from "mongoose";
import { MONGO_URI, MONGO_DB_NAME } from "./config.json";

const createDatabaseConnection = async () => {
  await mongoose.connect(
    `${MONGO_URI}/${MONGO_DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (!err) return console.log("Connected to db!");
    }
  );
};

export default createDatabaseConnection;
