function havePermission(permissions = ["Admin"]) {
  return (req, res, next) => {
    const accessType = req.session.user.accessType;
    const isValid = permissions.includes(accessType);

    if (!isValid) {
      req.session.destroy(() => {
        res.redirect("/auth/login");
      });
    } else {
      next();
    }
  };
}

module.exports = havePermission;
