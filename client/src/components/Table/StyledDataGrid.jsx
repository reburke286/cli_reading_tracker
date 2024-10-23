import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { deepPurple } from "@mui/material/colors";
import { Button, Box } from "@mui/material";
import _ from "lodash";
import dayjs from "dayjs";
dayjs().format();

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: deepPurple[100],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

export const StyledButton = styled(Button)({
  textTransform: "none",
  border: "none !important",
  "&:hover": {
    border: "none !important",
  },
  "&:active": {
    border: "none !important",
    color: deepPurple[800],
  },
  "&:focus": {
    border: "none !important",
  },
  "&:visited": {
    border: "none !important",
  },
});

const columns = [
  { field: "title", headerName: "Title", flex: 2 },
  { field: "author", headerName: "Author", flex: 2 },
  { field: "yearPublished", headerName: "Year Published", flex: 1 },
  { field: "genre", headerName: "Genre", flex: 2 },
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

export default function TableComponent({ books }) {
  return (
    <Box sx={{ height: "600px" }} p={3}>
      {books.length > 0 && (
        <StripedDataGrid
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rows={books}
          columns={columns}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      )}
    </Box>
  );
}
