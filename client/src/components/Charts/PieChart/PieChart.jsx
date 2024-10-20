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
import { booksReadByAuthorType, booksByGenre } from "../../../utils/helpers";
import { useEffect, useState, useCallback } from "react";
import { purple } from "@mui/material/colors";
import _ from "lodash";

export default function PieGraph({ data }) {
  const [authorType, setAuthorType] = useState("gender");
  const [isGenre, setIsGenre] = useState(false);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (!isGenre) {
      setFormattedData(booksReadByAuthorType(data, authorType));
    } else {
      setFormattedData(booksByGenre(data, false));
    }
  }, [authorType, isGenre]);

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

  const RADIAN = Math.PI / 180;
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
        {`Books by ${isGenre ? "Genre" : `Author ${_.capitalize(authorType)}`}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsGenre(false);
            setAuthorType("gender");
          }}
        >
          By Gender
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setIsGenre(false);
            setAuthorType("nationality");
          }}
        >
          By Nationality
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setIsGenre(false);
            setAuthorType("race");
          }}
        >
          By Race
        </Button>
        <Button variant="contained" onClick={() => setIsGenre(true)}>
          By Genre
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
