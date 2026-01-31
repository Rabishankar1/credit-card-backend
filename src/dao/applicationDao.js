const Application = require("../models/application.model");

const getApplicationById = async (applicationId) => {
    return await Application.findOne({applicationId});
}

const saveApplication = async (data) => {
    return await Application.create(data);
}

module.exports = {
    getApplicationById,
    saveApplication,
}