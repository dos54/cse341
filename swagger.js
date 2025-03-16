const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Contacts Api',
    description: 'Contacts Api',
  },
  host: '10.0.0.100:3000',
  schemes: ['https', 'http'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
