const Application = require("../models/application.model");

const getApplicationById = async (applicationId) => {
    return await Application.findOne({applicationId});
}

const saveApplication = async (data) => {
    return await Application.create(data);
}

const getApplications = async () => {
    return await Application.find()
}
module.exports = {
    getApplicationById,
    saveApplication,
    getApplications
}