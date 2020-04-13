const userHandler = require("../models/user");
const bookHandler = require("../models/book");

async function getAllUser(req, res) {
  let users = await userHandler.findAllUser();
  users = users.filter(user => user.isAdmin !== true);
  res.json(users);
}

async function getSingleUser(req, res) {
  let userId = req.params.userId;
  let user = await userHandler.findUser({ _id: userId });

  if (!user) res.status(404).json({ message: "No user found!" });
  else res.json(user);
}

async function getAllBook(req, res) {
  let books = await bookHandler.findAllBook();
  res.json(books);
}

async function getSingleBook(req, res) {
  let bookId = req.params.bookId;
  let book = await bookHandler.findSingleBook({ _id: bookId });

  if (!book) res.status(404).json({ message: "No book found!" });
  else res.json(book);
}

async function RemoveUser(req, res) {
  const userId = req.params.userId;
  const user = await userHandler.findUser({ _id: userId });
  if (!user) {
    res.status(404).json({ message: "No user found!" });
  } else {
    await bookHandler.removeUserBook({ _id: userId });
    await userHandler.removeUser(userId);
    res.json({ message: "User removed successfully." });
  }
}

async function RemoveBook(req, res) {
  const bookId = req.params.bookId;
  let book = await bookHandler.findSingleBook({ _id: bookId });
  if (!book) {
    res.status(404).json({ message: "No book found!" });
  } else {
    await bookHandler.removeBook({ _id: bookId });
    res.json({ message: "Book removed successfully" });
  }
}

module.exports = {
  getAllUser,
  getSingleUser,
  getAllBook,
  getSingleBook,
  RemoveUser,
  RemoveBook
};
