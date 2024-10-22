import dayjs from "dayjs";
import { monthNames } from "./constants";
import _ from "lodash";
import commaNumber from "comma-number";

export const listOfFinishedBooks = (data) => {
  let finishedBooks = [];
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

export const totalPageCount = (data) => {
  const total = pageCountPerMonth(data).reduce(
    (acc, curr) => acc + curr["Page Count"],
    0
  );
  return commaNumber(total);
};

export const booksPerMonth = (data) => {
  const finishedBooks = listOfFinishedBooks(data);
  const groupedByMonth = _.groupBy(finishedBooks, "monthFinished");
  const graphData = [];
  for (const key of Object.keys(groupedByMonth)) {
    const month = groupedByMonth[key];
    graphData.push({ name: key, Books: month.length });
  }
  return graphData.sort(
    (a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name)
  );
};

export const booksReadByAuthorType = (data, authorType) => {
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

export const booksByRating = (data) => {
  const result = {};
  data.map(({ rating }) => {
    if (rating && rating > 0) {
      if (!result[rating]) {
        result[rating] = 0;
      }
      result[rating] += 1;
    }
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
  return graphData.sort((a, b) => b.name - a.name);
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

export const booksByAuthor = (data) => {
  const result = {};
  data.map(({ author }) => {
    if (!result[author] & (author !== "")) {
      result[author] = 0;
    }
    result[author] += 1;
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

  const sorted = graphData.sort((a, b) => b.value - a.value);
  return [sorted[0], sorted[1], sorted[2]];
};

export const bookFormatByMonth = (data) => {
  const finishedBooks = listOfFinishedBooks(data);
  const groupedByMonth = _.groupBy(finishedBooks, "monthFinished");
  const graphData = [];
  for (const key of Object.keys(groupedByMonth)) {
    const result = {};
    const month = groupedByMonth[key];
    month.map(({ readingFormat }) => {
      if (!result[readingFormat] & (readingFormat !== "")) {
        result[readingFormat] = 0;
      }
      result[readingFormat] += 1;
    });
    graphData.push({ name: key, ...result });
  }
  return graphData.sort(
    (a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name)
  );
};
