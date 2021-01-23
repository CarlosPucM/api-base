import Joi from "joi";

const schemaUser = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    age:  Joi.number().integer().required()
});

export default schemaUser;