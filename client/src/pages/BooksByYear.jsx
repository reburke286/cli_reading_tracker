import { useState, useEffect } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import LineGraph from "../components/Charts/LineGraph/LineGraph";
import PieGraph from "../components/Charts/PieChart/PieChart";
import { pageCountPerMonth, divideByYear } from "../utils/helpers";
import { methodMadness } from "../../routes";
import dayjs from "dayjs";
import { purple } from "@mui/material/colors";
import TableComponent from "../components/Table/StyledDataGrid";

export default function BooksByYear() {
  const [books, setBooks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [year, setYear] = useState(dayjs().get("year"));
  const [years, setYears] = useState([]);

  async function getBooks() {
    const bookData = await methodMadness("GET", "api/books");
    if (bookData) {
      setBooks(bookData);
      setChartData(divideByYear(bookData)[year]);
      setYears(Object.keys(divideByYear(bookData)));
    }
  }

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  return (
    <Stack>
      <Stack spacing={3} padding={5}>
        <Typography variant="h2" sx={{ color: purple[800] }}>
          {year} Reading
        </Typography>
      </Stack>
      {books && books.length > 0 && (
        <Box display="flex" flexDirection={"column"} ml={4}>
          <Box display="flex">
            <Box sx={{ width: "80%" }}>
              <TableComponent books={chartData} />
            </Box>
            <Box
              display="flex"
              flexDirection={"column"}
              sx={{
                width: "20%",
                margin: "20px 20px 0px 0px",
                alignItems: "flex-end",
              }}
            >
              {years.map((y) => (
                <Button
                  sx={{
                    margin: "10px",
                    width: "50%",
                  }}
                  variant="contained"
                  onClick={() => {
                    setYear(y);
                    setChartData(divideByYear(books)[y]);
                  }}
                >
                  {y}
                </Button>
              ))}
            </Box>
          </Box>
          <Box mb={4}>
            <Typography
              variant="h4"
              sx={{ color: purple[800], margin: "0px 0px 20px 20px" }}
            >
              Page Count Per Month
            </Typography>
            <LineGraph data={pageCountPerMonth(chartData)} />
          </Box>
          <Box>
            <PieGraph data={chartData} />
          </Box>
        </Box>
      )}
    </Stack>
  );
}

//DNF
//highlights
//ratings breakdown
//rereads
//rating breakdown by genre
//breakdown everything by genre
//breakdown everything by rating