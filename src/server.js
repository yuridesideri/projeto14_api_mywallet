import express from 'express';
import cors from 'cors';
import { pingDatabase, testServerResponse } from "./controllers/tests.controllers.js";
import { signUpUser, signInUser } from './controllers/auth.controllers.js';
import { getUserDetails } from './controllers/user.controllers.js';
import { executeUserTransaction } from './controllers/transactions.controllers.js'


const server = express();
server.use(cors());
server.use(express.json());

//Usar Routers


server.post('/test', pingDatabase);
server.get('/test', testServerResponse);



server.post('/sign-in', signInUser);
server.post('/sign-up', signUpUser);



server.get('/account-details', getUserDetails);
server.post('/transaction', executeUserTransaction);





server.listen(5000, () => console.log('Starting in port 5000'));
