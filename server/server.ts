// import "@types/express";
import { app } from "./app";
require("dotenv").config();
import connectDB from "./utlis/db";

// create server
app.listen(8080,'0.0.0.0', () => {
  console.log(`server is connected with port ${process.env.PORT}`);
  connectDB();
});
