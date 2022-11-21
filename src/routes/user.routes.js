import {Router} from "express";
import { getTransactionsDetails, getUserDetails } from '../controllers/user.controllers.js';
import { executeUserTransaction } from '../controllers/transactions.controllers.js';
import { authenticateUserMdw } from "../middlewares/auth.middlewares.js";
import { validateTransactionMdw } from "../middlewares/transaction.middlewares.js";

const userRoutes = Router();

userRoutes.use(authenticateUserMdw);


userRoutes.get('/account-details', getUserDetails);
userRoutes.post('/transaction', validateTransactionMdw, executeUserTransaction);
userRoutes.get('/transaction', getTransactionsDetails);


export default userRoutes;