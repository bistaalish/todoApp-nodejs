const Joi = require('joi');

// Validation schema for the task data
const addTaskSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
});

const updateTask = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    completed: Joi.boolean().not().required()
})
// Middleware function to validate the request body
const validateTaskData = (req, res, next) => {
  const { error } = addTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateUpdateTask = (req,res,next) => {
    const { error } = updateTask.validate(req.body);
    if (error) {
        return res.status(500).json({ error: error.details[0].message });
    }
    next();
}

module.exports = { validateTaskData,validateUpdateTask };
