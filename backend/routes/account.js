const express = require('express')
const passport = require('passport')

const router = express.Router()
// const User = require('../models/user')
// const isAuthenticated = require('../middlewares/isAuthenticated')

/*
router.post('/', (req, res) => {
  const { username } = req.session

  res.send(`${username} is logged in`)
})
*/

/*
router.post('/signup', async (req, res, next) => {
  const {
    username, password, email, firstname, lastname, avatar,
  } = req.body

  try {
    await User.create({
      username, password, email, firstname, lastname, avatar,
    })
    res.send('this user is created successfully')
  } catch (err) {
    next(err)
  }
})
*/

/*
router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (user) {
      req.session.username = username
      req.session.password = password
      res.send(`${username} is logged in`)
    } else {
      next(err)
    }
  })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')

  res.send('user logged out')
})
*/
// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user })
})

// auth logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}))

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user)
  res.redirect('/profile/')
})

module.exports = router
