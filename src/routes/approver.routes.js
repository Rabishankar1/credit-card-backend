const express = require("express");
const { getApplications } = require("../dao/applicationDao");
const router = express.Router();

router.get('/applications', async (req, res, next) => {
  try {
    const data = await getApplications();
    return res.json(data)
  } catch (error) {
    return res.sendStatus(500);
  }
})
module.exports = router;
