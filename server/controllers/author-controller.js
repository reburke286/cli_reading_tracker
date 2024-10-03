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
    console.log(req.params)
    try {
      const author = await Author.findOne({ name: req.params.authorId });

      res.json(author);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createAuthor(req, res) {
    //need to get the author
    try {
      const newAuthor = await Author.create(req.body);
      res.json(newAuthor);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = authorController;
