//TODO IMPLEMENT PEER TO PEER TRANSACTIONS
import dayjs from "dayjs";
import { sessionsCol, transactionsCol } from "../database.js";

export async function executeUserTransaction(req, res) {
    const token = req.headers.authentication?.replace('Bearer ', '');
    const {description, value, type} = req.body;
    try{
        if (!(type === 'in' || type === 'out')) throw 'Not valid transaction type'
        const {email} = await sessionsCol.findOne({token});
        if (!email) throw 'Expired Token';
        const log = {
            email,
            date: dayjs().locale('pt-br').format('DD/MM'),
            description,
            value,
            type
        }
        await transactionsCol.insertOne(log);
        res.sendStatus(201);
    } catch (err) {
        if (err === "Expired Token") res.status(400).send(err);
        if (err === 'Not valid transaction type') res.status(400).send(err);
    }
}