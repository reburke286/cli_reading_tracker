import dayjs from "dayjs";
import { monthNames } from "../../../utils/constants";
import _ from "lodash";

const listOfFinishedBooks = (data) => {
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
    graphData.push({ name: key, 'Page Count': pageCount });
  }
  return graphData.sort((a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name))
};
