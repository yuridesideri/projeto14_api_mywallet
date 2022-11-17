import { cannotHaveAUsernamePasswordPort } from "whatwg-url";
import { usersCol, sessionsCol } from "../database.js";
import {v4 as Uuid} from 'uuid';

export async function signInUser(req, res) {
    const token = Uuid();
    const { username, password } = req.body;
    try {
        //TODO Checking User Section Exists
        const user = await usersCol.findOne({ username, password });
        if (!user) throw "No user found"
        const loggedUser = await sessionsCol.findOne({username})
        if (loggedUser) {
            await sessionsCol.updateOne({username, userId: user._id}, {$set: {token}})
            res.status(202).send(token);
            return;
        }
        await sessionsCol.insertOne({username, userId : user._id, token})
        res.status(202).send(token);
    } catch (err) {
        if (err === 'No user found') res.status(406).send(err);
        console.log(err);
    }
}

export async function signUpUser(req, res) {
    const { username, password } = req.body;
    try {
        const userExists = await usersCol.findOne({ username });
        if (userExists) throw "Username taken";
        await usersCol.insertOne({ username, password });
        res.status(201).send("User Created");
    } catch (err) {
        if (err === "Username taken") res.status(409).send(err);
        console.log(err);
    }
}


export async function updateUserToken(userId){

}