import Joi from "joi";

export const tokenSchema = Joi.string().required().min(3);

export const transactionSchema = Joi.object().keys({
    value: Joi.number().required().greater(0),
    description: Joi.string().min(3).max(30).required(),
    type: Joi.string().valid('in','out').required()
}).required()


export const userSignInSchema = Joi.object().keys({
    email: Joi.string().required().min(5).max(40),
    password: Joi.string().required().min(3).max(16),
})


export const userSignUpSchema = userSignInSchema.keys({
    name: Joi.string().required().min(3).max(50),
})