import { sessionsCol } from "../database.js";
import { tokenSchema } from "../models/models.js";
import { userSignInSchema, userSignUpSchema } from "../models/models.js";
import { usersCol } from "../database.js";


export async function authenticateUserMdw(req, res, next) {
    const { authentication } = req.headers;
    const token = authentication?.replace("Bearer ", "");
    try{
        const validatedToken = await tokenSchema.validateAsync(token);
        const {userId} = await sessionsCol.findOne({token : validatedToken});
        res.locals.userId = userId;
        next()
    } catch (err) {
        res.status(408).send('Request Timeout');
    }
}


export async function userSignInMdw (req, res, next) {
    try{
        const validated = await userSignInSchema.validateAsync(req.body)
        const user = await usersCol.findOne(validated);
        res.locals.userSignIn = {...validated, userId: user._id};
        if (!user) throw "No user found";
        next()
    } catch (err) { 
        if (err === 'No user found') res.status(406).send(err);
        else res.status(422).send('Dados inválidos');
    }
    
}

export async function userSignUpMdw (req, res, next) {
    try{
        const validated = await userSignUpSchema.validateAsync(req.body)
        res.locals.userSignUp = validated;
        next()
    } catch (err) { 
        res.status(422).send('Dados inválidos');
    }
    
}