const {checkEligibilitySchema, createApplicationSchema} = require("../validators/user.validator");

const checkEligibilityValidator = (req, res, next) => {
  const { error, value } = checkEligibilitySchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map(err => err.message)
    });
  }

  // attach validated data (optional but recommended)
  req.body = value;
  next();
};

const createApplicationValidator = (req, res, next) => {
  const { error, value } = createApplicationSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map(err => err.message)
    });
  }

  // attach validated data (optional but recommended)
  req.body = value;
  next();
};

module.exports = {
  checkEligibilityValidator,
  createApplicationValidator
};
