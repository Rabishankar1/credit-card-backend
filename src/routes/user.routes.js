const express = require("express");
const { checkEligibility, createApplicationController, getApplicationController } = require("../controllers/user.controller");
const { checkEligibilityValidator, createApplicationValidator } = require("../middlewares/user.validator.middleware");


const router = express.Router();

router.post('/checkEligibility', checkEligibilityValidator, checkEligibility)
router.post('/application',createApplicationValidator, createApplicationController)
router.get('/application/:id', getApplicationController)
module.exports = router;
