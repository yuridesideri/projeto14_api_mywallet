import { testCol } from '../database.js'

export async function pingDatabase (req, res) {
    try{
        await testCol.insertOne({test: "true"});
        await testCol.remove({test: "true"});
        res.status(200).send('Funcionando e Operante Capitão 🫡');
    } catch (err) {
        console.log(err);
        res.status(400).send('Infelizmente não consegui conectar ao database 🥲')
    }
}

export function testServerResponse (req, res) {
    res.status(200).send('Hello Node Server!')    
}