const inquirer = require("inquirer");
const { genreChoices } = require("../utils/constants");
const dayjs = require("dayjs");
dayjs().format();
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const fetch = require("node-fetch");

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
      // validate: (date) => {
      //   if (isNaN(dayjs(date, "YYYY-MM-DD").$d)) {
      //     return "Date should be formatted as YYYY-MM-DD";
      //   } // strict parsing)
      //   return true;
      // },
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
    headers,
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

const data = [
  {
    _id: "66fdc97546ece3045924f11b",
    title: "The Color Purple",
    author: "Alice Walker",
    authorId: "66fdbb77da4d9e56afdbdd1e",
    genre: ["Fiction"],
    yearPublished: 1982,
    dateStarted: "2024-09-30T04:00:00.000Z",
    dateFinished: "2024-10-02T04:00:00.000Z",
    pageCount: 304,
    rating: 4.5,
    reread: false,
    readingFormat: "Audiobook",
    __v: 0,
  },
  {
    _id: "66fdca573b2181d1b5a315c6",
    title: "Two Can Play",
    author: "Ali Hazelwood",
    authorId: "66fdc99d46ece3045924f11e",
    genre: ["Romance"],
    yearPublished: 2024,
    dateStarted: "2024-10-02T04:00:00.000Z",
    dateFinished: "2024-10-02T04:00:00.000Z",
    rating: 3,
    reread: false,
    readingFormat: "Audiobook",
    __v: 0,
  },
  {
    _id: "66ff2f44a0a64eb5b730960d",
    title: "Beautyland",
    author: "Marie-Helene Bertino",
    authorId: "66fde09b4d0ac4ee6fdbf376",
    genre: ["Fiction, SciFi"],
    yearPublished: 2024,
    dateStarted: "2024-09-29T04:00:00.000Z",
    pageCount: 336,
    rating: 3,
    readingFormat: "Audiobook",
    __v: 0,
  },
  {
    _id: "67097f6db82941e5ace98c7f",
    title: "Kingdom of Ash",
    author: "Sarah J. Maas",
    authorId: "67097eb00218d598d126b9b9",
    genre: ["YA", "Fantasy"],
    yearPublished: 2018,
    dateStarted: "2023-12-29T00:00:00.000Z",
    dateFinished: "2024-01-06T00:00:00.000Z",
    pageCount: 980,
    rating: 4,
    readingFormat: "E-Book",
    __v: 0,
  },
  {
    _id: "6709805f5fc385f6945f0461",
    title: "Fable",
    author: "Adrienne Young",
    authorId: "67097ffe5fc385f6945f045c",
    genre: ["YA", "Fantasy"],
    yearPublished: 2018,
    dateStarted: "2024-01-02T00:00:00.000Z",
    dateFinished: "2024-01-04T00:00:00.000Z",
    pageCount: 357,
    rating: 3,
    readingFormat: "Audiobook",
    __v: 0,
  },
  {
    _id: "6709818bed4308e1b8732575",
    title: "The Hurting Kind",
    author: "Ada Limon",
    authorId: "670980fea8b370791f488bc9",
    genre: ["Poetry"],
    yearPublished: 2022,
    dateStarted: "2024-01-02T00:00:00.000Z",
    dateFinished: "2024-01-11T00:00:00.000Z",
    pageCount: 120,
    rating: 4,
    readingFormat: "E-Book",
    __v: 0,
  },
  {
    _id: "670981cded4308e1b8732579",
    title: "Namesake",
    author: "Adrienne Young",
    authorId: "67097ffe5fc385f6945f045c",
    genre: ["YA", "Fantasy"],
    yearPublished: 2021,
    dateStarted: "2024-01-06T00:00:00.000Z",
    dateFinished: "2024-01-09T00:00:00.000Z",
    pageCount: 360,
    rating: 2.5,
    readingFormat: "Audiobook",
    __v: 0,
  },
  {
    _id: "6709821bed4308e1b8732580",
    title: "Chain-Gang All Stars",
    author: "Nana Kwame Adjei-Brenyah",
    authorId: "6709821bed4308e1b873257d",
    genre: ["Fiction", "SciFi"],
    yearPublished: 2023,
    dateStarted: "2024-01-09T00:00:00.000Z",
    dateFinished: "2024-01-29T00:00:00.000Z",
    pageCount: 367,
    rating: 1,
    readingFormat: "Audiobook",
    __v: 0,
  },
  {
    _id: "6709831ced4308e1b8732587",
    title: "The New Jim Crow",
    author: "Michelle Alexander",
    authorId: "6709831bed4308e1b8732584",
    genre: ["Non-Fiction", "Politics/Current Affairs"],
    yearPublished: 2010,
    dateStarted: "2024-01-08T00:00:00.000Z",
    dateFinished: "2024-01-19T00:00:00.000Z",
    pageCount: 290,
    rating: 4,
    readingFormat: "Library Book",
    __v: 0,
  },
  {
    _id: "670983fec175740029263aed",
    title: "Manacled",
    author: "SenLinYu",
    authorId: "670983fec175740029263aea",
    genre: ["Fantasy"],
    yearPublished: 2018,
    dateStarted: "2024-01-09T00:00:00.000Z",
    dateFinished: "2024-01-20T00:00:00.000Z",
    pageCount: 876,
    rating: 4.5,
    readingFormat: "E-Book",
    __v: 0,
  },
  {
    _id: "6709856e960a41ce9bb6b273",
    title: "A Far Wilder Magic",
    author: "Allison Saft",
    authorId: "6709856e960a41ce9bb6b270",
    genre: ["YA", "Fantasy"],
    yearPublished: 2022,
    dateStarted: "2024-01-10T00:00:00.000Z",
    dateFinished: "2024-01-18T00:00:00.000Z",
    pageCount: 384,
    rating: 3,
    readingFormat: "E-Book",
    __v: 0,
  },
  {
    _id: "670986392929d2e97361f8b7",
    title: "Ayesha At Last",
    author: "Uzma Jalaluddin",
    authorId: "670986392929d2e97361f8b4",
    genre: ["Romance"],
    yearPublished: 2018,
    dateStarted: "2024-01-14T00:00:00.000Z",
    dateFinished: "2024-01-17T00:00:00.000Z",
    pageCount: 368,
    rating: 3,
    readingFormat: "Audiobook",
    __v: 0,
  },
  {
    _id: "670d3c8e8985ce12d4ddef2f",
    title: "Trick Mirror",
    author: "Jia Tolentino",
    authorId: "670d3c8e8985ce12d4ddef2c",
    genre: ["Non-Fiction", "Essay"],
    yearPublished: 2019,
    dateStarted: "2024-01-18T00:00:00.000Z",
    dateFinished: "2024-01-21T00:00:00.000Z",
    pageCount: 303,
    rating: 3,
    readingFormat: "Audiobook",
    __v: 0,
  },
];
