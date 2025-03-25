const xml = require('xml')

const calculateResult = (req, res) => {
  const { operation, num1, num2 } = req.query

  const a = parseFloat(num1)
  const b = parseFloat(num2)

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send('Invalid numbers provided')
  }

  let result
  switch (operation) {
    case 'add':
      result = a + b
      break
    case 'subtract':
      result = a - b
      break
    case 'multiply':
      result = a * b
      break
    case 'divide':
      if (b === 0) {
        return res.status(400).send('Cannot divide by 0!')
      }
      result = a / b
      break
    case 'modulo':
      result = a % b
      break
    default:
      return res.status(400).send('Invalid operation.')
  }

  const xmlResponse = xml({
    methodResponse: [{ params: [{ param: [{ value: [{ int: result }] }] }] }],
  })

  res.set('Content-Type', 'text/xml')
  res.send(xmlResponse)
}

module.exports = { calculateResult }
