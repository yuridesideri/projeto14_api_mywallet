import express from "express";
import cors from "cors";
import router from "./routes/index.routers.js";
import * as dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);
server.get("/health", (req, res) => {
	res.send("OK");
});

const port = process.env.SERVER_PORT || 5000;
server.listen(port, () => console.log(`Starting in port ${port}`));
