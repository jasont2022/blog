const mongoose = require('mongoose')
const { isEmail } = require('validator')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String, required: true, minlength: 8, maxlength: 20,
  },
  firstname: { type: String, required: true, minlength: 3 },
  lastname: { type: String, required: true, minlength: 3 },
  email: {
    type: String, required: true, unique: true, validate: [isEmail, 'invalid email'],
  },
  googleId: String,
  avatar: { data: Buffer, contentType: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  postlikes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  postdiskes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  commentlikes: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  commentdislikes: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  // if have time, add date field with moment
})

module.exports = model('User', userSchema)
