/* eslint-disable no-console */
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const path = require('path')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')

const app = express()
const AccountRouter = require('./routes/account')
const ProfileRouter = require('./routes/profile')

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
    keys: [keys.session.cookieKey],
    maxAge: 26 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use(passport.initialize())
app.use(passport.session)

app.use('/account', AccountRouter)
app.use('/profile', ProfileRouter)

app.get('/', (req, res) => {
  res.render('home', { user: req.user })
})

app.use((err, _req, res, _next) => {
  console.log(err.stack)
  res.status(500).send('Ops something went wrong')
})

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => console.log('listening to 3000'))
