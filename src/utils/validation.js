const Joi = require('joi');

exports.addTaskSchema = Joi.object({
    title: Joi.string().min(3).max(50),
    description: Joi.string().max(200),
});


