import dayjs from "dayjs";
import { monthNames } from "./constants";
import _ from "lodash";

const listOfFinishedBooks = (data) => {
  let finishedBooks = [];
  // const formattedData = formatBookData(data);
  for (let i = 0; i < data.length; i++) {
    const b = data[i];
    if (b.dateFinished && b.pageCount) {
      const monthFinished = monthNames[dayjs(b.dateFinished).get("month")];
      if (monthFinished) {
        finishedBooks.push({ ...b, monthFinished });
      }
    }
  }
  return finishedBooks;
};

const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

export const divideByYear = (data) => {
  const formattedData = formatBookData(data);
  let yearDict = {};
  formattedData.map((book) => {
    if (book.dateFinished) {
      const yearFinished = book.dateFinished.substring(0, 4);
      if (!yearDict[yearFinished]) {
        yearDict[yearFinished] = [{ ...book }];
      }
      yearDict[yearFinished].push({ ...book });
    }
  });
  const uniqDict = {};
  for (const key of Object.keys(yearDict)) {
    uniqDict[key] = _.uniqBy(yearDict[key], "id");
  }
  return uniqDict;
};

export const pageCountPerMonth = (data) => {
  const finishedBooks = listOfFinishedBooks(data);
  const groupedByMonth = _.groupBy(finishedBooks, "monthFinished");
  const graphData = [];
  for (const key of Object.keys(groupedByMonth)) {
    const month = groupedByMonth[key];
    const pageCount = month.reduce((acc, curr) => {
      if (curr.pageCount) {
        return acc + curr.pageCount;
      }
    }, 0);
    graphData.push({ name: key, "Page Count": pageCount });
  }
  return graphData.sort(
    (a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name)
  );
};

export const booksReadByAuthorType = (data, authorType) => {
  console.log(data);
  const result = {};
  data.map(({ authorId }) => {
    for (const key of Object.keys(authorId)) {
      if (key === authorType) {
        const curr = authorId[key];
        if (!result[curr] & (curr !== "")) {
          result[curr] = 0;
        }

        result[curr] += 1;
      }
    }
  });
  const graphData = [];
  for (const x of Object.keys(result)) {
    const curr = result[x];
    graphData.push({
      name: x,
      value: curr,
      percentage: Math.round((curr / data.length) * 100),
    });
  }

  return graphData.sort((a, b) => b.value - a.value);
};

export const booksByGenre = (data) => {
  const result = {};
  data.map(({ genre }) => {
    genre.split(",").map((g) => {
      console.log(g);
      if (g !== "") {
        if (!result[g]) {
          result[g] = 0;
        }
        result[g] += 1;
      }
    });
  });
  const total = sumValues(result);
  const graphData = [];
  for (const x of Object.keys(result)) {
    const curr = result[x];
    graphData.push({
      name: x,
      value: curr,
      percentage: Math.round((curr / total) * 100),
    });
  }
  return graphData.sort((a, b) => b.value - a.value);
};

export const formatBookData = (data) => {
  let finalBooks = [];
  data.map((d) => {
    d.readingDates.map((r, i) => {
      finalBooks.push({
        id: `${d.title}-${i}`,
        title: d.title,
        author: d.author,
        yearPublished: d.yearPublished,
        genre: d.genre.toString(),
        rating: d.rating,
        dateStarted: r.dateStarted,
        dateFinished: r.dateFinished,
        readingFormat: d.readingFormat,
        pageCount: d.pageCount,
        reread: d.reread,
        authorId: { ...d.authorId },
      });
    });
  });

  return finalBooks.sort(
    (a, b) => new Date(b.dateFinished) - new Date(a.dateFinished)
  );
};
