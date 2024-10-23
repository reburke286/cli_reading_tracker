const { Book, Author } = require("../models");
const _ = require("lodash");

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
    let payload = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      yearPublished: req.body.yearPublished,
      readingDates: [
        {
          dateStarted: req.body.dateStarted,
          dateFinished: req.body.dateFinished,
        },
      ],
      rating: req.body.rating,
      reread: req.body.isReread,
      readingFormat: req.body.readingFormat,
      pageCount: req.body.pageCount,
    };
    try {
      const { _id } = await Author.findOne({ name: req.body.author });
      if (!_id) {
        json.status(500).json({
          message: "No author found for this book. Create author first.",
        });
      }
      payload = { ...payload, authorId: _id };
      //first check if it's been read before
      if (req.body.isReread) {
        const book = await Book.findOne({ title: req.body.title });
        if (book) {
          const updatedBook = await Book.findOneAndUpdate(
            { _id: book._id },
            { $push: { readingDates: payload.readingDates } }
          );
          res.json(updatedBook);
        } else {
          const newBook = await Book.create(payload);
          res.json(newBook);
        }
      } else {
        const newBook = await Book.create(payload);
        res.json(newBook);
      }
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
  async deleteBook(req, res) {
    try {
      const deletedBook = await Book.findOneAndDelete({
        _id: req.params.bookId,
      });

      if (!deletedBook) {
        return res.status(404).json({ message: "No book with this id!" });
      }
      res.json({ message: "Book deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = bookController;
