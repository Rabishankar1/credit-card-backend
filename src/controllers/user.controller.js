const User = require("../models/user.model");
const moment = require("moment");
const {
  applicationStatus,
  ALLOWED_CREDIT_SCORE,
} = require("../constants/constant");
const { getUserByPanNumber, createUser } = require("../dao/userDao");
const {
  saveApplication,
  getApplicationById,
} = require("../dao/applicationDao");

const getRandomCreditScore = () => {
  return Math.floor(Math.random() * (850 - 700 + 1)) + 700;
};

const isUnder18 = (dob) => {
  const age = moment().diff(moment(dob), "years");
  return age < 18;
};

// helper to generate applicationId
const generateApplicationId = (name, dob) => {
  const namePart = name.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  const dobPart = new Date(dob).getFullYear(); // YYYY
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit

  return `${namePart}${dobPart}${randomPart}`;
};

const checkCreditLimit = (annualIncome) => {
  if (annualIncome < 200000) return 50000;
  if (annualIncome > 200000 && annualIncome <= 300000) return 75000;
  if (annualIncome > 300000) return 100000;
};

const isApplicationAlreadyExisted = async (panNumber) => {
  // get application by pan
  const user = await getUserByPanNumber(panNumber);
  if (!user || user == null) return false;
  return false;
};

const isLessCreditScore = () => {
  const creditScore = getRandomCreditScore();
  return creditScore < ALLOWED_CREDIT_SCORE;
};

const checkEligibility = async (req, res, next) => {
  try {
    const { dob, pan, salary } = req.body;

    // check for age
    if (isUnder18(dob)) {
      return res.send({
        status: applicationStatus.REJECTED,
        message: "Age must be greater than 18",
      });
    }

    const isExists = await isApplicationAlreadyExisted(pan);
    if (isExists) {
      return res.send({
        status: "EXISTED",
        message: "Application with given pan no already exist",
      });
    }

    if (isLessCreditScore())
      return res.send({
        status: applicationStatus.REJECTED,
        message: "Credit score is less than 800",
      });

    const creditLimit = checkCreditLimit(salary);

    return res.send({
      status: applicationStatus.APPROVED,
      message: "Application approved",
      creditLimit,
    });
  } catch (err) {
    res.send(500);
  }
};

const createApplicationController = async (req, res) => {
  try {
    const { name, email, dob, pan, salary } = req.body;

    // 1. Check if user exists
    let user = await User.findOne({ pan });

    if (!user) {
      const data = {
        name,
        email,
        dob,
        pan,
        salary,
        pan,
      };
      user = await createUser(data);
    }

    const creditLimit = checkCreditLimit(salary);

    // 2. Save application
    const data = {
        applicationId: generateApplicationId(name, dob),
        status: "PENDING",
        user_id: user._id,
        approved_limit: creditLimit,
    };

    const application = await saveApplication(data);
    return res.status(201).json({
      success: true,
      message: "Application saved successfully",
      data: {
        user,
        application,
      },
    });
  } catch (error) {
    console.error("Save Application Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getApplicationController = async (req, res, next) => {
  try {
    const { applicationId } = req.body;
    const applicationData = await getApplicationById(applicationId);
    if (!applicationData) return res.send({ message: "No application found" });

    const userData = await getUserById(applicationId);

    const data = {
      ...applicationData,
      ...userData,
    };

    return res.send(data);
  } catch (err) {
    res.send(500);
  }
  j;
};

module.exports = {
  checkEligibility,
  createApplicationController,
  getApplicationController,
};
