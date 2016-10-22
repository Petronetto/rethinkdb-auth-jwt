const express = require('express')
const rdb = require('../lib/rethink')
const token = require('../lib/token')
const auth = require('../lib/auth')
const router = express.Router()

router.get('/', (request, response, next) => {
  response.json('Find in /users or /login') 
})

module.exports = router