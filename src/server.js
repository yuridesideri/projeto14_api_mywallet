import express from 'express';
import cors from 'cors';
import { pingDatabase, testServerResponse } from "./controllers/tests.controllers.js";
import { signUpUser, signInUser } from './controllers/authentication.controllers.js';
import { getUserDetails, executeUserTransaction } from './controllers/user.controllers.js';


const server = express();
server.use(cors());
server.use(express.json());



server.post('/test', pingDatabase);
server.get('/test', testServerResponse);



server.post('/users-signin', signInUser);
server.post('/users-signup', signUpUser);



server.get('/user-account-details', getUserDetails);
server.post('/user-transaction', executeUserTransaction);





server.listen(5000);
