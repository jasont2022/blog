const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    next(res.send('User is not logged in'))
  }
}

module.exports = checkAuthenticated
