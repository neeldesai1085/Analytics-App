import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventsRouter from "./routes/events.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://analytics-app-beryl.vercel.app"
    ]
  })
);
app.use(express.json());
app.use("/api", eventsRouter);

const PORT = process.env.PORT!;
const MONGO_URI = process.env.MONGODB_URI!;

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((e) => console.error("Mongo connection error", e));
