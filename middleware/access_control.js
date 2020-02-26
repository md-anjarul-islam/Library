const bookHandler = require("../models/book");

function checkAdmin(req, res, next) {
  const user = req.headers.user;
  if (user.isAdmin == true) next();
  else res.status(403).json({ message: "Request Forbidden!" });
}

// Checks whether the right person is requesting for his own information or not
async function verify_user(req, res, next) {
  const user = req.headers.user;
  if (req.params.userId == user._id) next();
  else res.status(401).json({ message: "Unauthorized Access!" });
}

// Checks whether the right person is requesting for his own book or not
async function verify_modifier(req, res, next) {
  const user = req.headers.user;
  const bookId = req.params.bookId;
  const result = await bookHandler.findSingleBook({
    _id: bookId,
    modifier: user._id
  });

  if (result) next();
  else res.status(401).json({ message: "Unauthorized Access!" });
}

module.exports = {
  checkAdmin,
  verify_user,
  verify_modifier
};
