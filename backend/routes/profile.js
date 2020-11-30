const express = require('express')

const router = express.Router()
const User = require('../models/user')
const { checkAuthenticated } = require('../middlewares/isAuthenticated')

router.get('/', checkAuthenticated, (req, res) => {
  res.render('profile', { user: req.user })
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
