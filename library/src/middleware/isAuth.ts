module.exports = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/api/user/login");
  }

  next();
};