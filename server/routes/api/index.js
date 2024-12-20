const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

const { getBooks, getBook, createBook, updateBook, deleteBook } = require("../../controllers/book-controller");
const { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require("../../controllers/author-controller");

router.route("/users").get(getUsers).post(createUser);
router.route("/users/:userId").get(getUser).put(updateUser).delete(deleteUser);
router.route("/books").get(getBooks).post(createBook);
router.route("/books/:bookId").get(getBook).put(updateBook).delete(deleteBook)
router.route("/authors").get(getAuthors).post(createAuthor);
router.route("/authors/:authorId").get(getAuthor).put(updateAuthor).delete(deleteAuthor)
module.exports = router;
