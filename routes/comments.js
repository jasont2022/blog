const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Post = require('../models/post')
const checkAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', (_req, res, next) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      next(err)
    } else {
      res.send(comments)
    }
  })
})

/*
router.get('/:username', async (req, res, next) => {
  const { username } = req.params
  try {
    const { comments } = await User.findOne({ username }).populate('comments')
    res.send(comments)
  } catch (err) {
    next(err)
  }
})
*/

/*
router.get('/:title', async (req, res, next) => {
  const { title } = req.params
  try {
    const { comments } = await Post.findOne({ title }).populate('comments')
    res.send(comments)
  } catch (err) {
    next(err)
  }
})
*/

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send('not valid comment id')
  }
  Comment.findById({ _id: id }, (err, comment) => {
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
    const comment = await Comment.create({ author, text, post })
    author.comments.push(comment)
    author.save()
    post.comments.push(comment)
    post.save()
    res.send('comment created successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/:id', checkAuthenticated, async (req, res, next) => {
  const { id } = req.params
  const { text } = req.body
  const { username } = req.user
  try {
    const { author } = await Comment.findById({ _id: id }).populate('author')
    if (username !== author.username) {
      return res.send('not comment author')
    }
    await Comment.findOneAndUpdate({ _id: id }, { text })
    return res.send('comment updated successfully')
  } catch (err) {
    return next(err)
  }
})

module.exports = router
