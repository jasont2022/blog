const express = require('express')

const router = express.Router()
const User = require('../models/user')

// middleware
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/account/login')
  } else {
    next()
  }
}

router.get('/', authCheck, (req, res) => {
  res.render('profile', { user: req.user })
})

router.post('/edit', async (req, res, next) => {
  const {
    password, email, firstname, lastname, avatar,
  } = req.body
  const { username } = req.session

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
