import { connect } from "mongoose";
import { DATABASE_URL } from "./config.js";

connect(DATABASE_URL as string)
  .then((db) => console.log("MongoDB Connected:", db.connection.name))
  .catch((e) => {
    throw e;
  });
