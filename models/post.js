const mongoose = require('mongoose')

const { Schema, model } = mongoose

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId, ref: 'User', required: true,
  },
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  category: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  // postlikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // postdiskes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // if have time, add date field with moment
})

module.exports = model('Post', postSchema)
