const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
const User = require('../models/user')
const checkAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', async (_req, res, next) => {
  try {
    const users = await User.find().select('-password')
    res.send(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:username', async (req, res, next) => {
  const { username } = req.params
  try {
    const user = await User.findOne({ username })
      .populate('posts').populate('comments').select('-password')
    res.send(user)
  } catch (err) {
    next(err)
  }
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
