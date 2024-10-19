import { Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { methodMadness } from "../../routes";
import BooksByYear from "./BooksByYear";
import { formatBookData } from "../utils/helpers";
import _ from "lodash";
import dayjs from "dayjs";
dayjs().format();

export default function Landing() {
  const [books, setBooks] = useState([]);
  async function getBooks() {
    const bookData = await methodMadness("GET", "api/books");
    if (bookData) {
      const formattedData = formatBookData(bookData);
      setBooks(formattedData);
    }
  }

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  return (
    <Stack spacing={3} sx={{ width: "100%", height: "100%" }}>
      <BooksByYear />
    </Stack>
  );
}
