import { app } from "./app";
require("dotenv").config();
import connectDB from "./utlis/db";

const PORT = process.env.PORT || 8080;

// create server
app.listen(PORT, () => {
  console.log(`server is connected with port ${PORT}`);
  connectDB();
});
