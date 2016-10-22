const express = require('express')
const rdb = require('../lib/rethink')
const auth = require('../lib/auth')
const router = express.Router()

router.get('/', auth.authorize, (request, response) => {
  rdb.findAll('users')
    .then((users) => {
      response.json(users)
    })
})

router.get('/:id', auth.authorize, (request, response, next) => {
  rdb.find('users', request.params.id)
    .then((user) => {
      if(!user) {
        const notFoundError = new Error('User not found')
        notFoundError.status = 404
        return next(notFoundError)
      }

      response.json(user)
    })
})

router.post('/', auth.authorize, (request, response) => {
  auth.hash_password(request.body.password)
    .then((hash) => {
      const newUser = {
        name: request.body.name,
        email: request.body.email,
        password: hash
      }
      rdb.save('users', newUser)
        .then((result) => {
            response.json(result)
        })
    })
})

router.put('/:id', auth.authorize, (request, response) => {
  rdb.find('users', request.params.id)
    .then((user) => {
      const updateUser = {
        name: request.body.user || user.name,
        email: request.body.email || user.email
      }

      rdb.edit('users', user.id, updateUser)
      .then((results) => {
        response.json(results)
      })
    })
})

router.delete('/:id', auth.authorize, (request, response) => {
  rdb.destroy('users', request.params.id)
    .then((results) => {
      response.json(results)
    })
})

module.exports = router