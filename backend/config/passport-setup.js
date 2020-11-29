const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys')
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (user) {
      done(null, user)
    } else {
      done(err)
    }
  })
})

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/account/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    const createUser = async () => {
      try {
        const { displayName, id, _json } = profile
        const newUser = await User.create({
          username: displayName,
          googleId: id,
          avatar: _json.image.url,
        })
        console.log(`new user created: ${newUser}`)
        done(null, newUser)
      } catch (err) {
        console.log(`an error has occured ${err}`)
        done(err)
      }
    }

    User.findOne({ googleId: profile.id }, (err, currentUser) => {
      if (currentUser) {
        // already have user
        console.log(`user is ${currentUser}`)
        done(null, currentUser)
      } else {
        createUser()
      }
    })
  }),
)
