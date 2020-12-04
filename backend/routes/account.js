const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')

const router = express.Router()
const User = require('../models/user')
const checkAuthenticated = require('../middlewares/isAuthenticated')

router.post('/signup', async (req, res, next) => {
  const {
    username, password, email, firstname, lastname, avatar,
  } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({
      username, password: hashedPassword, email, firstname, lastname, avatar,
    })
    res.send('this user is created successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureFlash: true,
}))

router.post('/logout', checkAuthenticated, (req, res) => {
  req.logout()
  res.send('user logged out sucessfully')
})

module.exports = router
