import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI as string;
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI não definida no .env");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
  }
};
