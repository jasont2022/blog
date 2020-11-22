/* eslint-disable no-console */
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const path = require('path')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

app.use(express.static('dist'))
app.use(express.json())
app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 26 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use((err, _req, res, _next) => {
  console.log(err.stack)
  res.status(500).send(`${err}`)
})

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening to 3000')
})
