const jwt = require('jwt-simple')
const moment = require('moment')
const secret = process.env.TOKEN_SECRET

module.exports.generate = (user) => {
  const expires = moment().add(7, 'days').valueOf()
  return jwt.encode({ iss: user.email, exp: expires }, secret)
}

module.exports.verify = (token, next) => {
  if(!token) {
    const notFoundError = new Error('Token not found')
    notFoundError.status = 403
    return next(notFoundError)
  }

  if(jwt.decode(token, secret) <= moment().format('x')) {
    const expiredError = new Error('Token has expired')
    expiredError.status = 401
    return next(expiredError)
  }
}