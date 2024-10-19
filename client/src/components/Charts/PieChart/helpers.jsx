import _ from "lodash";

export const booksReadByAuthorType = (data, authorType) => {
  const result = {};
  data.map(({ authorId }) => {
    for (const key of Object.keys(authorId)) {
      if (key === authorType) {
        const curr = authorId[key];
        if (!result[curr]) {
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
    genre.map((g) => {
      if (!result[g]) {
        result[g] = 0;
      }
      result[g] += 1;
    });
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
