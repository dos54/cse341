const UsersModel = require("../models/users-model");

const getAllUsers = async (req, res) => {
  const result = await UsersModel.getAllUsers().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getUserById = async (req, res) => {
  const result = await UsersModel.getUserById(req.params.id).then((user) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  });
};

const addUser = async (req, res) => {
  const newUser = req.body;
  const newUserId = await UsersModel.addUser(newUser).then((userId) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(userId);
  });
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  const result = await UsersModel.deleteUserById(userId).then(
    (deletionResults) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ itemsDeleted: deletionResults });
    }
  );
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
};
