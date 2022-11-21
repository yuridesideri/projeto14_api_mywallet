import {Router} from "express";
import { signUpUser, signInUser } from '../controllers/auth.controllers.js';
import { userSignUpMdw, userSignInMdw } from "../middlewares/auth.middlewares.js";

const authRoutes = Router();

authRoutes.post('/sign-in', userSignInMdw,  signInUser);
authRoutes.post('/sign-up', userSignUpMdw,  signUpUser);


export default authRoutes;