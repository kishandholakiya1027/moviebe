const { Joi } = require("express-validation");

const userValidation = {
    adduser :{
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
          }),
    },
    login:{
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
          }), 
    }
}

module.exports = userValidation