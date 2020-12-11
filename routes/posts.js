const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const checkAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', async (_req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'username')
    res.send(posts)
  } catch (err) {
    next(err)
  }
})

/*
router.get('/:username', async (req, res, next) => {
  const { username } = req.params
  try {
    const { posts } = await User.findOne({ username }).populate('posts')
    res.send(posts)
  } catch (err) {
    next(err)
  }
})
*/

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send('not valid post id')
  }
  try {
    const post = await Post.findById({ _id: id }).populate('author', 'username')
    res.send(post)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAuthenticated, async (req, res, next) => {
  const { username } = req.user
  const { title, text, category } = req.body
  try {
    const author = await User.findOne({ username })
    const post = await Post.create({
      author, title, text, category,
    })
    author.posts.push(post)
    author.save()
    res.send('post created successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/:id', checkAuthenticated, async (req, res, next) => {
  const { id } = req.params
  const { title, text, category } = req.body
  const { username } = req.user
  try {
    const { author } = await Post.findOne({ _id: id }).populate('author')
    if (username !== author.username) {
      return res.send('not post author')
    }
    await Post.findOneAndUpdate({ _id: id }, { title, text, category })
    return res.send('post updated successfully')
  } catch (err) {
    return next(err)
  }
})

module.exports = router
