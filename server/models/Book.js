const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
    },
    author: {
      type: String,
      required: true,
      minlength: 1,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    genre: [
      {
        type: String,
      },
    ],
    yearPublished: {
      type: Number,
      min: 1000,
      max: 9999,
    },
    readingDates: [
      {
        dateStarted: {
          type: Date,
          default: Date.now
        },
        dateFinished: Date,
      },
    ],
    pageCount: {
      type: Number,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    reread: {
      type: Boolean,
    },
    readingFormat: {
      type: String,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;
