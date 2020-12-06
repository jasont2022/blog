/* eslint-disable no-console */
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const AccountRouter = require('./routes/account')
const ProfileRouter = require('./routes/profile')
const PostRouter = require('./routes/posts')
const CommentRouter = require('./routes/comments')
const initializePassport = require('./config/passport-setup')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()

initializePassport(passport)

server.prepare().then(() => {
  const app = express()
  app.use(express.json())
  app.use(
    cookieSession({
      name: 'local-session',
      keys: ['jfdfdfrzqndfsdfpqqazf'],
      maxAge: 26 * 60 * 60 * 1000, // 24 hours
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/account', AccountRouter)
  app.use('/profile', ProfileRouter)
  app.use('/posts', PostRouter)
  app.use('/comments', CommentRouter)

  app.get('/user', (req, res) => {
    if (!req.user) {
      res.send('user not logged in')
    } else {
      const { username } = req.user
      res.json({ username })
    }
  })

  app.use((err, _req, res, _next) => {
    console.log(err.stack)
    res.status(500).send(`${err}`)
  })

  app.all('*', (req, res) => handle(req, res))

  app.listen(port, err => {
    if (err) throw err
    console.log(`listening to ${port}`)
  })
})
