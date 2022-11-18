import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const db_uri = process.env.DB_URI;


const client = new MongoClient(db_uri);
const db = await client.db('my_wallet_api');
export const usersCol = await db.collection('users');
export const transactionsCol = await db.collection('transactions');
export const sessionsCol = await db.collection('sessions');
export const testCol = await db.collection('tests');


export default db;
