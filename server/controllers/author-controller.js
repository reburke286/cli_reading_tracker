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
      if (author.name === req.body.name) {
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
};

module.exports = authorController;
