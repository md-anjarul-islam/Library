const userHandler = require("../models/user");
const bookHandler = require("../models/book");

async function getHome(req, res) {
  const books = await bookHandler.findAllBook();
  res.json(books);
}

async function login(req, res) {
  let user = req.body;
  const validation = await userHandler.loginValidate(user);
  if (validation == false) {
    res.status(401).json({ message: "The username or password is incorrect." });
  } else {
    user = await userHandler.findUser({ username: user.username });
    const token = await user.getAuthToken();
    res.set({ "x-token": token }).json(user);
  }
}

async function register(req, res) {
  const result = await userHandler.createUser(req.body);
  if (result == false) {
    const message = "Username or Email already exists!";
    res.status(409).json({ message });
  } else {
    const user = await userHandler.findUser({ username: req.body.username });
    const token = await user.getAuthToken();
    res
      .status(201)
      .set({ "x-token": token })
      .json(user);
  }
}

async function getAllBooks(req, res) {
  const books = await bookHandler.findAllBook();
  res.json(books);
}

async function getSingleBook(req, res) {
  const bookId = req.params.bookId;
  const book = await bookHandler.findSingleBook({ _id: bookId });

  if (!book) res.status(404).json({ message: "No book found!" });
  else res.json(book);
}

module.exports = {
  getHome,
  login,
  register,
  getAllBooks,
  getSingleBook
};
