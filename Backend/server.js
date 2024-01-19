import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
// import superAdminRoutes from "./routes/superAdminRoutes.js";

dotenv.config();

connectDb();

const PORT = process.env.PORT || 7060;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
// app.use("/api/superAdmin", superAdminRoutes);

app.get("/api", (req, res) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.bgMagenta);
});
