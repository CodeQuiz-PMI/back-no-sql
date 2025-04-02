import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";

dotenv.config();
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/codequiz");

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
