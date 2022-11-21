import  { usersCol, sessionsCol, transactionsCol } from "../database.js";

export async function getUserDetails (req, res) {
    const { authentication } = req.headers;
    const token = authentication?.replace("Bearer ", "");
    try {
    if (!token) throw 'No Token'
    const hasToken = await sessionsCol.findOne({token});
    if (!hasToken) throw 'Session Expired'
    const userData = await usersCol.findOne({_id: hasToken.userId})
    delete userData.password;
    res.status(200).send(userData);

    } catch (err) {
        if (err === 'Session Expired') res.status(408).send('Request Timeout');
        if (err === 'No Token') res.status(401).send('Unauthorized');
    }
}


export async function getTransactionsDetails (req, res) {
    
    const token = req.headers.authentication?.replace('Bearer ', '');
    try {
        const { email } = await sessionsCol.findOne({token});
        if (!email) throw 'Session Expired';
        const query = await transactionsCol.find({email}).toArray();
        res.status(200).send(query);
    } catch (err) {
        if (err === 'Session Expired') res.status(408).send('Request Timeout');
        else {res.status(400).send(err)};
    }
}
