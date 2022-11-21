import { transactionSchema } from "../models/models.js";

export async function validateTransactionMdw (req, res, next) {
    try {
        const validatedTransaction = await transactionSchema.validateAsync(req.body);
        res.locals.transaction = validatedTransaction;
        next()
    } catch (err) {
        res.status(422).send('Not valid transaction');
    }

}