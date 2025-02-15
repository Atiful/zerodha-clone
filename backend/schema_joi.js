const Joi = require('joi');

const userSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().min(6).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});


module.exports = {
    userSchema
};