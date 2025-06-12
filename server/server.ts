import { app } from "./app";
require("dotenv").config();
import connectDB from "./utlis/db";

const port = process.env.PORT || 8080;

// create server
app.listen(port, () => {
  console.log(`server is connected with port ${port}`);
  connectDB();
});
