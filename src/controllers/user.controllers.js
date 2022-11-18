import  { usersCol, sessionsCol } from "../database.js";

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

