const express = require('express')

const router = express.Router()
const User = require('../models/user')
const { checkAuthenticated } = require('../middlewares/isAuthenticated')

router.get('/:username', (req, res, next) => {
  const { username } = req.params
  User.findOne({ username }, (err, user) => {
    if (err) {
      next(err)
    } else {
      const {
        posts, _id, email, firstname, lastname,
      } = user
      res.send({
        posts, id: _id, username, email, firstname, lastname,
      })
    }
  })
})

router.post('/edit', checkAuthenticated, async (req, res, next) => {
  const {
    password, email, firstname, lastname, avatar,
  } = req.body
  const username = req.user

  try {
    await User.findOneAndUpdate({ username }, {
      password, email, firstname, lastname, avatar,
    })
    res.send('user was updated')
  } catch (err) {
    next(err)
  }
})

module.exports = router
