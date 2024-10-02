const inquirer = require("inquirer");

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: ["See my dashboard", "Add a book", "Leave"],
      },
    ])
    .then((info) => {
      switch (info.start) {
        case "See my dashboard":
          return console.log("go to the frontend :)");
        case "Add a book":
          return addBook();
        default:
          console.log("Latersss");
          process.exit();
      }
    });
}

function addBook() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Book Name",
      },
      {
        type: "input",
        name: "author",
        message: "Book Author(s)",
      },
      {
        type: "input",
        name: "genre",
        message: "Book Genre",
        //turn into checkbox?
      },
      {
        type: "input",
        name: "yearPublished",
        message: "Year of Publication",
        //validate to 4 numbers
      },
      {
        type: "input",
        name: "dateStarted",
        message: "Date Started",
        //validate to date format
      },
      {
        type: "input",
        name: "dateEnded",
        message: "Date Ended",
        //validate to date format
      },
      {
        type: "list",
        name: "rating",
        message: "Rating",
        choices: [
          {
            name: "1",
            value: 1,
          },
          {
            name: "1.5",
            value: 1.5,
          },
          {
            name: "2",
            value: 2,
          },
          {
            name: "2.5",
            value: 2.5,
          },
          {
            name: "3",
            value: 3,
          },
          {
            name: "3.5",
            value: 3.5,
          },
          {
            name: "4",
            value: 4,
          },
          {
            name: "4.5",
            value: 4.5,
          },
          {
            name: "5",
            value: 5,
          },
        ],
      },
      {
        type: "list",
        name: "readingFormat",
        message: "Reading Format",
        choices: ["Physical Book", "E-Book", "Audiobook", "Library Book"],
      },
      {
        type: "checkbox",
        name: "isReread",
        message: "Reread",
        choices: [
          {
            name: "True",
            value: true,
          },
          {
            name: "False",
            value: false,
          },
        ],
      },
      {
        type: "input",
        name: "pageCount",
        message: "Page Count",
        //validate min/max
        //validate number
      },
    ])
    .then((bookInfo) => {
      console.log(`Thanks for adding ${bookInfo.title}. I hope you liked it!`);
      //get authorId or createAuthor
      //if authorId, then createBook
      init()
    });
}
module.exports = init;
