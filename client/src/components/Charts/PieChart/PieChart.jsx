import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { colors } from "../../../utils/constants";
import { Box, Button, Typography } from "@mui/material";
import {
  booksReadByAuthorType,
  booksByGenre,
  booksByRating,
} from "../../../utils/helpers";
import { useEffect, useState, useCallback } from "react";
import { purple } from "@mui/material/colors";
import _ from "lodash";

export default function PieGraph({ data }) {
  const [formattedData, setFormattedData] = useState([]);
  const [chartState, setChartState] = useState("gender");

  useEffect(() => {
    if (
      chartState === "gender" ||
      chartState === "race" ||
      chartState === "nationality"
    ) {
      setFormattedData(booksReadByAuthorType(data, chartState));
    } else if (chartState === "genre") {
      setFormattedData(booksByGenre(data));
    } else if (chartState === "rating") {
      setFormattedData(booksByRating(data));
    }
  }, [chartState, data]);

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

  const renderLabel = useCallback((piePiece) => {
    return `${piePiece.percentage}%`;
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      sx={{ width: "50%", height: "1000px" }}
    >
      <Typography
        variant="h4"
        sx={{ color: purple[800], margin: "0px 0px 20px 20px" }}
      >
        {`Books by ${_.capitalize(chartState)}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button variant="contained" onClick={() => setChartType("gender")}>
          By Gender
        </Button>
        <Button
          variant="contained"
          onClick={() => setChartState("nationality")}
        >
          By Nationality
        </Button>
        <Button variant="contained" onClick={() => setChartState("race")}>
          By Race
        </Button>
        <Button variant="contained" onClick={() => setChartState("genre")}>
          By Genre
        </Button>
        <Button variant="contained" onClick={() => setChartState("rating")}>
          By Rating
        </Button>
      </Box>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            fill="#8884d8"
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            height={300}
            payload={formattedData.map((item, index) => {
              return {
                id: item.name,
                type: "square",
                value: `${item.name} (${item.percentage}%)`,
                color: COLORS[index % COLORS.length],
              };
            })}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
