const express = require('express')

const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const { checkAuthenticated } = require('../middlewares/isAuthenticated')

router.get('/', (_req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      next(err)
    } else {
      res.send(posts)
    }
  })
})

router.get('/:username', async (req, res, next) => {
  const { username } = req.params
  try {
    const user = await User.findOne({ author: username }).populate('posts')
    res.send(user.posts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Post.findOne({ _id: id }, (err, post) => {
    if (err) {
      next(err)
    } else {
      res.send(post)
    }
  })
})

router.get('/:title', (req, res, next) => {
  const { title } = req.params
  Post.findOne({ title }, (err, post) => {
    if (err) {
      next(err)
    } else {
      res.send(post)
    }
  })
})

router.post('/', checkAuthenticated, async (req, res, next) => {
  const { username } = req.user
  const { title, text, category } = req.body
  try {
    const author = await User.findOne({ username })
    await Post.create({
      author, title, text, category,
    })
    res.send('post created successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/:id', checkAuthenticated, async (req, res, next) => {
  const { id } = req.params
  const { title, text, category } = req.body
  try {
    await Post.findOneAndUpdate({ _id: id }, { title, text, category })
    res.send('post created successfully')
  } catch (err) {
    next(err)
  }
})

module.exports = router
