const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

const initialize = passport => {
  const authenticateUser = (email, password, done) => {
    User.findOne({ email }, async (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        }
        return done(null, false)
      } catch (e) {
        return done(e)
      }
    })
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (user) {
        done(null, user)
      } else {
        done(err)
      }
    })
  })
}

module.exports = initialize
