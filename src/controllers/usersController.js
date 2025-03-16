const UsersModel = require('../models/users-model')

const getAllUsers = async (req, res) => {
  //#swagger.tags=['Users']

  await UsersModel.getAllUsers().then((users) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(users)
  })
}

const getUserById = async (req, res) => {
  //#swagger.tags=['Users']

  await UsersModel.getUserById(req.params.id).then((user) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(user)
  })
}

const addUser = async (req, res) => {
  //#swagger.tags=['Users']

  const newUser = req.body
  await UsersModel.addUser(newUser).then((userId) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(userId)
  })
}

const deleteUserById = async (req, res) => {
  //#swagger.tags=['Users']

  const userId = req.params.id
  UsersModel.deleteUserById(userId).then((deletionResults) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ itemsDeleted: deletionResults })
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
}
