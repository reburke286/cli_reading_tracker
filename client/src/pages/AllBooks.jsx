import { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import LineGraph from "../components/Charts/LineGraph/LineGraph";
import PieGraph from "../components/Charts/PieChart/PieChart";
import { pageCountPerMonth } from "../utils/helpers";
import { methodMadness } from "../../routes";
import { purple } from "@mui/material/colors";

export default function AllBooks() {
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
      <Stack spacing={3} padding={5}>
        <Typography variant="h2" sx={{ color: purple[800] }}>
          All Books
        </Typography>
      </Stack>
      {books && books.length > 0 && (
        <Box display="flex" flexDirection={"column"} ml={4}>
          <Box mb={4}>
            <Typography variant="h4" sx={{ color: purple[800], margin: '0px 0px 20px 20px' }}>
              Page Count Per Month
            </Typography>
            <LineGraph data={pageCountPerMonth(books, false)} />
          </Box>
          <Box>
            <PieGraph data={books} />
          </Box>
        </Box>
      )}
    </Stack>
  );
}
