const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')

const router = express.Router()
const User = require('../models/user')
const { checkAuthenticated, checkNotAuthenticated } = require('../middlewares/isAuthenticated')

router.get('/signup', checkNotAuthenticated, (req, res) => {
  // res.render('some component')
})

router.post('/signup', checkNotAuthenticated, async (req, res, next) => {
  const {
    username, password, email, firstname, lastname, avatar,
  } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({
      username, password: hashedPassword, email, firstname, lastname, avatar,
    })
    res.send('this user is created successfully')
    // res.redirect('/login')
  } catch {
    // res.redirect('/signup')
  }
})

router.get('/login', checkNotAuthenticated, (req, res) => {
  // res.render('some component')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}))

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
