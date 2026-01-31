const User = require("../models/user.model");

const getUserById = async (id) => {
    return await User.findById(id);
}

const getUserByPanNumber = async (pan) => {
    return await User.findOne({pan})
}

const createUser = async (data) => {
    return await User.create(data);
}

module.exports = {
    getUserById,
    getUserByPanNumber,
    createUser
}