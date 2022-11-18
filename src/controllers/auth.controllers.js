import { usersCol, sessionsCol } from "../database.js";
import {v4 as Uuid} from 'uuid';

export async function signInUser(req, res) {
    const token = Uuid();
    const { email, password } = req.body;
    try {
        const user = await usersCol.findOne({ email, password });
        if (!user) throw "No user found"
        const loggedUser = await sessionsCol.findOne({email})
        if (loggedUser) {
            await sessionsCol.updateOne({email, userId: user._id}, {$set: {token}})
            res.status(202).send(token);
            return;
        }
        await sessionsCol.insertOne({email, userId : user._id, token})
        res.status(202).send(token);
    } catch (err) {
        if (err === 'No user found') res.status(406).send(err);
        console.log(err);
    }
}

export async function signUpUser(req, res) {
    //TODO data validation
    const { email, password, name } = req.body;
    try {
        const userExists = await usersCol.findOne({ email });
        if (userExists) throw "Email taken";
        await usersCol.insertOne({name, email, password });
        res.status(201).send("User Created");
    } catch (err) {
        if (err === "Email taken") res.status(409).send(err);
        console.log(err);
    }
}


export async function updateUserToken(userId){

}