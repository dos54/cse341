const query = require("../database/connection").query

const homeRoute = (req, res) => {
  res.send("Hello");
};

const professionalRoute = async (req, res) => {
  try {
    const data = await query("professional", "professional")
    res.json(data[0])
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({error: "Failed to fetch data"})
  }
}

module.exports = {
    homeRoute,
    professionalRoute,
}