const mongoose = require('mongoose')

const { Schema, model } = mongoose

const commentSchema = new Schema({
  author: { type: String, required: true, unique: true },
  text: { type: String },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  commentlikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  commentdislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // if have time, add date field with moment
})

module.exports = model('Comment', commentSchema)
