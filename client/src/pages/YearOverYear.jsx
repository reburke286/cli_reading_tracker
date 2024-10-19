import { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import LineGraph from "../components/Charts/LineGraph/LineGraph";
import PieGraph from "../components/Charts/PieChart/PieChart";
import { pageCountPerMonth } from "../utils/helpers";
import { methodMadness } from "../../routes";

export default function YearOverYear() {
  const [books, setBooks] = useState([]);

  async function getBooks() {
    const bookData = await methodMadness("GET", "api/books");
    if (bookData) {
      setBooks(bookData);
    }
  }

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  return (
    <Stack>
      {books && books.length > 0 && (
        <Box display="flex" flexDirection={"column"}>
          <Box>
            <LineGraph data={pageCountPerMonth(books, true)} />
          </Box>
          <PieGraph data={books} />
        </Box>
      )}
    </Stack>
  );
}
