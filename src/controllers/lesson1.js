const query = require('../database/index').query

const homeRoute = (req, res) => {
  res.send('Hello')
}

const professionalRoute = async (req, res) => {
  //#swagger.tags=['Professional Activity / Lesson 1']
  try {
    const data = await query('professional', 'professional')
    res.json(data[0])
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}

module.exports = {
  homeRoute,
  professionalRoute,
}
