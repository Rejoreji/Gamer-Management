function isAuth(req, res, next) {
  if (req.session.user) {
    res.locals.auth = { ...req.session.user };
    next();
  } else {
    res.redirect("/auth/login");
  }
}

module.exports = isAuth;
