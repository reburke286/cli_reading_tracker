const inquirer = require("inquirer");
const { genreChoices } = require("../../client/utils/constants");
const dayjs = require("dayjs");
dayjs().format();
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const fetch = require('node-fetch')

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
          console.log(`k. go there yourself. jeez. http://localhost:5173/`);
          setTimeout(function () {
            init();
          }, 4000);
          break;
        case "Add a book":
          addNewBook();
          break;
        default:
          console.log("Latersss");
          process.exit();
      }
    });
}

async function addNewBook() {
  const bookInfo = await inquirer.prompt([
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
      type: "checkbox",
      name: "genre",
      message: "Book Genre",
      choices: genreChoices,
    },
    {
      type: "input",
      name: "yearPublished",
      message: "Year of Publication",
      validate: (year) => {
        if (typeof year !== "number" && isNaN(year)) {
          return "Please enter a number";
        } else if (Number(year) < 1000 || Number(year) > 9999) {
          return "Please format your year as YYYY";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "dateStarted",
      message: "Date Started (YYYY-MM-DD)",
      validate: (date) => {
        if (isNaN(dayjs(date, "YYYY-MM-DD").$d)) {
          return "Date should be formatted as YYYY-MM-DD";
        } // strict parsing)
        return true;
      },
    },
    {
      type: "input",
      name: "dateFinished",
      message: "Date Finished (YYYY-MM-DD)",
      validate: (date) => {
        if (isNaN(dayjs(date, "YYYY-MM-DD").$d)) {
          return "Date should be formatted as YYYY-MM-DD";
        } // strict parsing)
        return true;
      },
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
      type: "list",
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
      validate: (page) => {
        if (typeof page !== "number" && isNaN(page)) {
          return "Please enter a number";
        } else if (Number(page) < 0 || Number(page) > 999999) {
          return "Please enter a number -- a believable one";
        }
        return true;
      },
    },
  ]);

  console.log(`Thanks for adding ${bookInfo.title}. I hope you liked it!
    \n`);
  let author = await checkForAuthor(bookInfo.author);
  while (!author) {
    author = await createNewAuthor(bookInfo.author);
  }

  console.log(`Alright we've got ${author.name} added to the database, which means ${bookInfo.title} is in there too!
              \n Good for you!`);
  await createNewbook(bookInfo, author._id);

  init();
}

async function createNewAuthor(authorName) {
  console.log(
    `Looks like we don't have an entry in our database for ${authorName} yet.
    \n Let's create it now.`
  );
  const authorInfo = await inquirer.prompt([
    {
      type: "list",
      name: "gender",
      message: "Author Gender",
      choices: ["Female", "Male", "Non-Binary", "Unknown"],
    },
    { type: "input", name: "race", message: "Author Race" },
    { type: "input", name: "nationality", message: "Author Nationality" },
  ]);

  await methodMadness("POST", "api/authors", {
    name: authorName,
    ...authorInfo,
  });
  const author = await checkForAuthor(authorName);
  return author;
}

async function checkForAuthor(name) {
  const author = await methodMadness("GET", `api/authors/${name}`);
  if (author) {
    return author;
  } else {
    return false;
  }
}

async function createNewbook(book, authorId) {
  await methodMadness("POST", "api/books", { ...book, authorId });
}

module.exports = init;

async function methodMadness(method, path, body) {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: "http://localhost:3001",
  };

  const url = path ? `http://localhost:3001/${path}` : `http://localhost:3001/`;

  const options = {
    mode: "cors",
    credentials: "include",
    method,
    headers
  };

  if (body) {
    options["body"] = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);
    const formatted = await response.json();
    const data = await formatted;
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
