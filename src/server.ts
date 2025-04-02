import { connectDatabase } from "./db";
import app from "./app";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
};

startServer();
