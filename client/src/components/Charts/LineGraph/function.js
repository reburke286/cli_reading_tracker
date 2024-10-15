const dayjs = require("dayjs");
const { monthNames } = require("../../../utils/constants");
const _ = require("lodash");

//import dayjs from 'dayjs';
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
    pageCount: 140,
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

const listOfFinishedBooks = (data) => {
  let finishedBooks = [];
  for (let i = 0; i < data.length; i++) {
    const b = data[i];
    if (b.dateFinished) {
      const monthFinished = monthNames[dayjs(b.dateFinished).get("month")];
      if (monthFinished) {
        finishedBooks.push({ ...b, monthFinished });
      }
    }
  }
  return finishedBooks;
};

function groupBy(array, key) {
  const result = {};
  array.forEach((item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  });
  return result;
}

const pageCountPerMonth = (data) => {
  const finishedBooks = listOfFinishedBooks(data);
  const groupedByMonth = groupBy(finishedBooks, "monthFinished");
  const graphData = []
  for (const key of Object.keys(groupedByMonth)) {
    const month = groupedByMonth[key];
    const pageCount = month.reduce((acc, curr) => {
      if (curr.pageCount) {
        return acc + curr.pageCount;
      }
    }, 0);
    graphData.push({name: key, pv: pageCount})
  }

};
pageCountPerMonth(data);

/**
 * const sum = data.reduce((accumulator, currentItem) => {
  return accumulator + currentItem.value;
}, 0);
 */
