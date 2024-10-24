import { Box, Typography, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import {
  booksByAuthor,
  listOfFinishedBooks,
  totalPageCount,
  booksByReadingLength,
  averageReading,
} from "../../utils/helpers";
import _ from 'lodash'

export default function Highlights({ data }) {
  const topAuthors = booksByAuthor(data);
  const shortestRead = booksByReadingLength(data).sort(
    (a, b) => a.duration - b.duration
  )[0];
  const longestRead = booksByReadingLength(data).sort(
    (a, b) => b.duration - a.duration
  )[0];
  const shortestBook = [...data].sort((a, b) => a.pageCount - b.pageCount)[0];
  const longestBook = [...data].sort((a, b) => b.pageCount - a.pageCount)[0];
  const oldestBook = [...data].sort(
    (a, b) => a.yearPublished - b.yearPublished
  )[0];
  const oneStars = [...data].filter((book) => book.rating === 1);
  const fiveStars = _.uniqBy([...data].filter((book) => book.rating === 5), 'title');
  return (
    <Box>
      <Typography variant="h4" color={purple[800]}>
        At a Glance
      </Typography>
      <Box display="flex" mt={3}>
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Total Books:
        </Typography>
        <Typography color={purple[900]} sx={{ fontWeight: "bold" }}>
          {listOfFinishedBooks(data).length}
        </Typography>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Total Pages:
        </Typography>
        <Typography color={purple[900]}>{totalPageCount(data)}</Typography>
      </Box>
      <Box display="flex">
        <>
          <Typography sx={{ fontWeight: "bold", width: 180 }}>
            Most Read Authors:
          </Typography>
        </>
        <Stack>
          {topAuthors.map((author) => (
            <Typography
              key={author.name}
            >{`${author.name} - ${author.value} books read`}</Typography>
          ))}
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Average Read Length:
        </Typography>
        <Stack>
          <Typography color={purple[800]}>{`${averageReading(
            data
          )} days`}</Typography>
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Longest Read:
        </Typography>
        <Stack>
          <Typography color={purple[800]}>
            {longestRead.title}
            <span
              style={{ color: "black" }}
            >{` - ${longestRead.duration} days`}</span>
          </Typography>
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Shortest Read:
        </Typography>
        <Stack>
          <Typography color={purple[800]}>
            {shortestRead.title}
            <span
              style={{ color: "black" }}
            >{` - ${shortestRead.duration} days`}</span>
          </Typography>
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Longest Book:
        </Typography>
        <Stack>
          <Typography color={purple[800]}>
            {longestBook.title}
            <span
              style={{ color: "black" }}
            >{` - ${longestBook.pageCount} pages`}</span>
          </Typography>
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Shortest Book:
        </Typography>
        <Stack>
          <Typography color={purple[800]}>
            {shortestBook.title}
            <span
              style={{ color: "black" }}
            >{` - ${shortestBook.pageCount} pages`}</span>
          </Typography>
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Oldest Book:
        </Typography>
        <Stack>
          <Typography color={purple[800]}>
            {oldestBook.title}
            <span
              style={{ color: "black" }}
            >{` - ${oldestBook.yearPublished}`}</span>
          </Typography>
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          1 Star Reads:
        </Typography>
        <Stack>
          {oneStars.map((book) => (
            <Typography key={book.id}>{book.title}</Typography>
          ))}
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          5 Star Reads:
        </Typography>
        <Stack>
          {fiveStars.map((book) => (
            <Typography key={book.id}>{book.title}</Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
