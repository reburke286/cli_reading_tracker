import { Box, Typography, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import { booksByAuthor, listOfFinishedBooks, totalPageCount } from "../../utils/helpers";

export default function Highlights({ data }) {
  const topAuthors = booksByAuthor(data);
  return (
    <Box>
      <Typography variant="h4" color={purple[800]}>
        At a Glance
      </Typography>
      <Box display="flex" mt={3}>
        <Typography sx={{ fontWeight: "bold", width: 150 }}>Total Books:</Typography>
        <Typography color={purple[900]} sx={{fontWeight: 'bold'}}>{listOfFinishedBooks(data).length}</Typography>
      </Box>
      <Box display="flex">
        <Typography sx={{ fontWeight: "bold", width: 150 }}>Total Pages:</Typography>
        <Typography color={purple[900]}>{totalPageCount(data)}</Typography>
      </Box>
      <Box display="flex">
        <>
          <Typography
            sx={{ fontWeight: "bold", width: 150 }}
          >Favorite Authors:</Typography>
        </>
        <Stack>
          {topAuthors.map((author) => (
            <Typography key={author.name}>{`${author.name} - ${author.value} books read`}</Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

//Longest Read
//Shortest Read