import { usersCol, sessionsCol } from "../database.js";
import {v4 as Uuid} from 'uuid';


export async function signInUser(req, res) {
    const token = Uuid();
    const { email, userId } = res.locals.userSignIn;
    try {
        const loggedUser = await sessionsCol.findOne({email})
        if (loggedUser) {
            await sessionsCol.updateOne({email, userId}, {$set: {token}})
            res.status(202).send(token);
            return;
        }
        await sessionsCol.insertOne({email, userId, token})
        res.status(202).send(token);
    } catch (err) {
        res.status(400).send("Couldn't connect to server")
        console.log(err);
    }
}

export async function signUpUser(req, res) {
    const { email, password, name } = req.body;
    try {
        const userExists = await usersCol.findOne({ email });
        if (userExists) throw "Email taken";
        await usersCol.insertOne({name, email, password });
        res.status(201).send("User Created");
    } catch (err) {
        if (err === "Email taken") res.status(409).send(err);
        else {res.status(400).send("Couldn't connect to server")}
        console.log(err);
    }
}

