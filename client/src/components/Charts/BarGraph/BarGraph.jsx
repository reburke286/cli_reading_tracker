import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { bookFormatByMonth, rereadsPerMonth, findUniqueFormats } from "../../../utils/helpers";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { purple } from "@mui/material/colors";
import { colors } from "../../../utils/constants";

const COLORS = [
  colors.purple,
  colors.blue,
  colors.teal,
  colors.pink,
  colors.green,
  colors.deepPurple,
  colors.amber,
  colors.orange,
  colors.red,
  colors.indigo,
  colors.lightBlue,
  colors.lightGreen,
  colors.cyan,
  colors.lime,
];

export default function BarGraph({ data }) {
  const [graphData, setGraphData] = useState(bookFormatByMonth(data));
  const [uniqueBars, setUniqueBars] = useState(findUniqueFormats(graphData));
  const [chartType, setChartType] = useState("Reading Format");

  useEffect(() => {
    if (chartType === 'Reading Format') {
      setGraphData(bookFormatByMonth(data))
      setUniqueBars(findUniqueFormats(bookFormatByMonth(data)))
    } else if (chartType === 'Rereads') {
      setGraphData(rereadsPerMonth(data))
      setUniqueBars(['Unique Title', 'Reread'])
    }
  }, [chartType, data]);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ color: purple[800], margin: "0px 0px 20px 20px" }}
      >
        {`${chartType} by Month`}
      </Typography>
      <Box display="flex">
        <BarChart
          width={730}
          height={400}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {uniqueBars.map((format, i) => (
            <Bar key={i} dataKey={format} fill={COLORS[i]} />
          ))}
        </BarChart>
        <Box display="flex" flexDirection="column" ml={3}>
          <Button
            sx={{ marginBottom: "20px" }}
            variant="contained"
            onClick={() => setChartType("Reading Format")}
          >
            Reading Format
          </Button>
          <Button variant="contained" onClick={() => setChartType("Rereads")}>
            Rereads
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
