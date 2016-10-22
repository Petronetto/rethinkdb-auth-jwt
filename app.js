// Dependencies
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').load()

// Configuring the modules 
const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

// Routes
const router = express.Router()
const index = require('./routes/index')
const users = require('./routes/users')
const login = require('./routes/login')

app.use('/', index)
app.use('/users', users)
app.use('/login', login)


// Starting the server
const server = app.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('App is listening on http://%s:%s', host, port)
})

app.use((error, request, response, next) => {
  response.status(error.status || 500)
  response.json({ error: error.message })
})