const swaggerAutogen = require('swagger-autogen')()

const doc = {
  swagger: '2.0',
  info: {
    title: 'Contacts API',
    description: 'Contacts API',
    version: '1.0.0',
  },
  host: '10.0.0.100:3000',
  schemes: ['https', 'http'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
