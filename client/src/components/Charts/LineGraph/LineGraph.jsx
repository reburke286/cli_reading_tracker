import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { pageCountPerMonth, booksPerMonth } from "../../../utils/helpers";
import { purple } from "@mui/material/colors";

export default function LineGraph({ data }) {
  const [linegraphValue, setLinegraphValue] = useState("Page Count");
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    switch (linegraphValue) {
      case "Page Count":
        setFormattedData(pageCountPerMonth(data));
        break;
      case "Books":
        setFormattedData(booksPerMonth(data));
        break;
    }
  }, [linegraphValue]);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ color: purple[800], margin: "0px 0px 20px 20px" }}
      >
        {`${linegraphValue} Per Month`}
      </Typography>
      <Box display="flex">
        <LineChart
          width={730}
          height={250}
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={linegraphValue}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
        <Box display="flex" flexDirection="column" ml={3}>
          <Button
            sx={{marginBottom: '20px'}}
            variant="contained"
            onClick={() => setLinegraphValue("Page Count")}
          >
            Total Pages
          </Button>
          <Button
            variant="contained"
            onClick={() => setLinegraphValue("Books")}
          >
            Total Books
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
