import express from 'express';
import cors from 'cors';
import { pingDatabase, testServerResponse } from "./controllers/tests.controllers.js";

const server = express();
server.use(cors());
server.use(express.json());


server.get('/',)


//Test functions
server.post('/test', pingDatabase)
server.get('/test', testServerResponse)
//End of Tests





server.listen(5000);
