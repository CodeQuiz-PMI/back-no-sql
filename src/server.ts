import { connectDatabase } from "./db";
import app from "./app";

const PORT = Number(process.env.PORT) || 4000;

const startServer = async () => {
	app.listen(PORT, () => {
		console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
	});
	await connectDatabase();
};

startServer();
