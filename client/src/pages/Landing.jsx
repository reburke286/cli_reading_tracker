import { DataGrid } from "@mui/x-data-grid";
import { Stack, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { methodMadness } from "../../routes/fetch";
import { StripedDataGrid } from "../components/StyledDataGrid";
import dayjs from "dayjs";
dayjs().format();

const columns = [
  { field: "title", headerName: "Title", flex: 2 },
  { field: "author", headerName: "Author", flex: 1 },
  { field: "yearPublished", headerName: "Year Published", flex: 1 },
  { field: "genre", headerName: "Genre", flex: 1 },
  { field: "rating", headerName: "Rating", flex: 1 },
  {
    field: "dateStarted",
    headerName: "Started",
    type: "date",
    valueGetter: (value) => value && new Date(value),
    flex: 1,
  },
  {
    field: "dateFinished",
    headerName: "Finished",
    type: "date",
    valueGetter: (value) => value && new Date(value),
    flex: 1,
  },
  { field: "readingFormat", headerName: "Format", flex: 1 },
  { field: "pageCount", headerName: "Page Count", flex: 1 },
  { field: "reread", headerName: "Reread", type: "boolean", flex: 1 },
];

const formatBookData = (data) => {
  return data
    .map((d) => ({
      ...d,
      id: d.title,
      genre: d.genre.toString(),
    }))
    .sort((a, b) => new Date(a.dateStarted) - new Date(b.dateStarted));
};
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
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Box sx={{ maxWidth: "1200px" }} p={3}>
        {books.length > 0 && (
          <StripedDataGrid
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            rows={books}
            columns={columns}
          />
        )}
      </Box>
    </Stack>
  );
}
