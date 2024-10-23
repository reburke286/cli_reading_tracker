import { Box, Typography, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import {
  booksByAuthor,
  listOfFinishedBooks,
  totalPageCount,
  booksByReadingLength,
  averageReading,
} from "../../utils/helpers";

export default function Highlights({ data }) {
  const topAuthors = booksByAuthor(data);
  const shortestRead = booksByReadingLength(data).sort((a, b) => a.duration - b.duration)[0]
  const longestRead = booksByReadingLength(data).sort((a, b) => b.duration - a.duration)[0]
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
          <Typography color={purple[800]}>{`${averageReading(data)} days`}</Typography>
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Longest Read:
        </Typography>
        <Stack>
          <Typography color={purple[800]}>{longestRead.title}<span style={{color: 'black'}}>{` - ${longestRead.duration} days`}</span></Typography>
        </Stack>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 180 }}>
          Shortest Read:
        </Typography>
        <Stack>
          <Typography color={purple[800]}>{shortestRead.title}<span style={{color: 'black'}}>{` - ${shortestRead.duration} days`}</span></Typography>
        </Stack>
      </Box>
    </Box>
  );
}
