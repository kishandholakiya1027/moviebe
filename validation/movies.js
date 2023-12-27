const { Joi } = require("express-validation");

const movieValidation = {
    createMovie :{
        body: Joi.object({
            title: Joi.string().required(),
            publish_year: Joi.string().regex(/[0-9]{4}/).required(),
            user_id:Joi.string().required(),
            image:Joi.any()
          }),
    }
}

module.exports = movieValidation