import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { bookFormatByMonth } from "../../../utils/helpers";
import { Box, Typography } from "@mui/material";

export default function BarGraph({ data }) {
  const [graphData, setGraphData] = useState(bookFormatByMonth(data));
  console.log(graphData);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ color: purple[800], margin: "0px 0px 20px 20px" }}
      >
        Reading Format by Month
      </Typography>
      <BarChart
        width={500}
        height={300}
        data={data}
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
        <Bar
          dataKey="pv"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="uv"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </Box>
  );
}
