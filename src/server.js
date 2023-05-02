import express from "express";
import cors from "cors";
import router from "./routes/index.routers.js";
import * as dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(cors({ origin: true, credentials: true }));
server.use(express.json());
server.get("/health", (req, res) => {
	res.send("OK");
});
server.use(router);

const port = process.env.SERVER_PORT || 5000;
server.listen(port, () => console.log(`Starting in port ${port}`));
