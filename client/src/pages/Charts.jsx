import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import LineGraph from "../components/Charts/LineGraph/LineGraph";
import { pageCountPerMonth } from "../components/Charts/LineGraph/helpers";
import { methodMadness } from "../../routes";


export default function Landing() {
  const [books, setBooks] = useState([]);

  async function getBooks() {
    const bookData = await methodMadness("GET", "api/books");
    if (bookData) {
      const formattedData = pageCountPerMonth(bookData);
      console.log(formattedData)
      setBooks(formattedData);
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
        <Box>
          <LineGraph data={books} />
        </Box>
      )}
    </Stack>
  );
}
