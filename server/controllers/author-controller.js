const { Author, Book } = require("../models");

const authorController = {
  async getAuthors(req, res) {
    try {
      const authors = await Author.find();

      res.json(authors);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getAuthor(req, res) {
    try {
      const author = await Author.findOne({ name: req.params.authorId });

      res.json(author);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createAuthor(req, res) {
    try {
      const author = await Author.findOne({ name: req.body.name });
      if (author && author.name === req.body.name) {
        res.json({ message: `This author already exists. Their id is ${author._id}` });
      } else {
        const newAuthor = await Author.create(req.body);
        res.json(newAuthor);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateAuthor(req, res) {
    try {
      const updatedAuthor = await Author.findOneAndUpdate(
        { _id: req.params.authorId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedAuthor) {
        res.status(404).json({ message: "No author found with that id" });
      }
      res.json(updatedAuthor);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteAuthor(req, res) {
    try {
      const deletedAuthor = await Author.findOneAndDelete({
        _id: req.params.authorId,
      });

      if (!deletedAuthor) {
        return res.status(404).json({ message: "No author with this id!" });
      }
      res.json({ message: "Author deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = authorController;
