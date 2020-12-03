const express = require('express')

const router = express.Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Post = require('../models/post')
const { checkAuthenticated } = require('../middlewares/isAuthenticated')

router.get('/', (_req, res, next) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      next(err)
    } else {
      res.send(comments)
    }
  })
})

router.get('/:username', async (req, res, next) => {
  const { username } = req.params
  try {
    const user = await User.findOne({ username }).populate('comments')
    res.send(user.comments)
  } catch (err) {
    next(err)
  }
})

router.get('/:title', async (req, res, next) => {
  const { title } = req.params
  try {
    const post = await Post.findOne({ title }).populate('comments')
    res.send(post.comments)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Comment.findOne({ _id: id }, (err, comment) => {
    if (err) {
      next(err)
    } else {
      res.send(comment)
    }
  })
})

router.post('/', checkAuthenticated, async (req, res, next) => {
  const { username } = req.user
  const { title, text } = req.body
  try {
    const author = await User.findOne({ username })
    const post = await Post.findOne({ title })
    await Comment.create({ author, text, post })
    res.send('post created successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/:username/update', checkAuthenticated, async (req, res, next) => {
  const { username } = req.params
  const { title, text, category } = req.body
  try {
    await Comment.findOneAndUpdate({ author: username }, { title, text, category })
    res.send('post created successfully')
  } catch (err) {
    next(err)
  }
})
module.exports = router
