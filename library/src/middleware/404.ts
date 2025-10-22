module.exports = (req: any, res: any) => {
  res.status(404);
  res.render("errors/404", { user: req.user || null });
};