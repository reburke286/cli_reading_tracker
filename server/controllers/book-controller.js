const { Book, Author } = require("../models");

const bookController = {
  async getBooks(req, res) {
    try {
      const books = await Book.find().populate({
        path: "authorId",
        model: Author,
      });
      if (books.length > 0) {
        res.json(books);
      } else {
        res.json("Sorry grl, no books. Maybe try and add one hunny");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getBook(req, res) {
    try {
      const book = await Book.findOne({ _id: req.params.bookId }).populate({
        path: "authorId",
        model: Author,
      });

      if (!book) {
        return res.status(404).json({
          message:
            "Nah, no book with that id. If you were looking for The Da Vinci Code, we do not carry that one.",
        });
      }
      res.json(book);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createBook(req, res) {
    //need to get the author
    try {
      const newBook = await Book.create(req.body);
      res.json(newBook);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateBook(req, res) {
    try {
      const updatedBook = await Book.findOneAndUpdate(
        { _id: req.params.bookId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedBook) {
        res.status(404).json({ message: "No book found with that id" });
      }
      res.json(updatedBook);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = bookController;
