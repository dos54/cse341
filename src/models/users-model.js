const { query, addData, deleteData } = require('../database')

async function getAllUsers() {
  const data = await query('learning', 'users')
  return data
}

async function getUserById(id) {
  const data = await query('learning', 'users', { id: Number(id) })
  return data[0]
}

async function addUser(userData) {
  const userId = await addData('learning', 'users', userData)
  return userId
}

async function deleteUserById(id) {
  const result = await deleteData('learning', 'users', { id: Number(id) })
  return result
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
}
