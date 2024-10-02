const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  race: {
    type: String,
  },
  nationality: {
    type: String,
  },
});

const Author = model("Author", authorSchema);

module.exports = Author;
