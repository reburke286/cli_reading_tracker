import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
} from "recharts";
import { bookFormatByMonth } from "../../../utils/helpers";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { purple } from "@mui/material/colors";
import { colors } from "../../../utils/constants";
import { uniq } from "lodash";

const findUniqueFormats = (data) => {
  const uniqueKeys = new Set();

  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (key !== "name") {
        uniqueKeys.add(key);
      }
    });
  });

  return Array.from(uniqueKeys);
};

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
  const uniqueFormats = findUniqueFormats(graphData);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ color: purple[800], margin: "0px 0px 20px 20px" }}
      >
        Reading Format by Month
      </Typography>
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
        {uniqueFormats.map((format, i) => (
          <Bar key={i} dataKey={format} fill={COLORS[i]} />
        ))}
      </BarChart>
    </Box>
  );
}
