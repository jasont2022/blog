const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
const User = require('../models/user')
const checkAuthenticated = require('../middlewares/isAuthenticated')

router.get('/:username', (req, res, next) => {
  const { username } = req.params
  User.findOne({ username }, (err, user) => {
    if (err) {
      next(err)
    } else {
      const {
        _id, email, firstname, lastname, posts, comments,
      } = user
      res.send({
        id: _id, username, email, firstname, lastname, posts, comments,
      })
    }
  })
})

router.post('/edit', checkAuthenticated, async (req, res, next) => {
  const {
    password, email, firstname, lastname, avatar,
  } = req.body
  const { username } = req.user

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate({ username }, {
      password: hashedPassword, email, firstname, lastname, avatar,
    })
    res.send('user was updated')
  } catch (err) {
    next(err)
  }
})

module.exports = router