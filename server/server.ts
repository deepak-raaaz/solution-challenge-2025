import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./utlis/db";

dotenv.config();

// Parse PORT from environment variable, default to 8080 if undefined or invalid
const port = parseInt(process.env.PORT || "8080", 10);

// Validate port
if (isNaN(port) || port <= 0) {
  console.error("Error: PORT environment variable must be a valid positive number");
  process.exit(1);
}

const startServer = async () => {
  try {
    // Connect to the database first
    await connectDB();
    console.log("Database connection established");

    // Start the server
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();