const bcrypt = require('bcrypt')
const Promise = require('bluebird')
const token = require('./token')

module.exports.authorize = (request, response, next) => {
    const apiToken = request.headers['x-api-token']
    console.log(apiToken)
    token.verify(apiToken, next)
    next()
}

module.exports.hash_password = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      console.log('password')
      console.log(password)
      if(error) return reject(error)
      bcrypt.hash(password, salt, (error, hash) => {
        if(error) return reject(error)
        return resolve(hash)
      })
    })
  })
}

module.exports.authenticate = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, response) => {
      if(error) return reject(error)
      return resolve(response)
    })
  })
}