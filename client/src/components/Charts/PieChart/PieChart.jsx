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
import { Box, Button } from "@mui/material";
import { booksReadByAuthorType, booksByGenre } from "../../../utils/helpers";
import { useEffect, useState, useCallback } from "react";
import { StyledButton } from "../../Table/StyledDataGrid";

const buttonStyle = {
  border: "none",
  "&:active": {
    border: "none",
  },
};

export default function PieGraph({ data }) {
  const [authorType, setAuthorType] = useState("gender");
  const [isGenre, setIsGenre] = useState(false);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    setIsGenre(false);
    setFormattedData(booksReadByAuthorType(data, authorType));
  }, [authorType]);

  useEffect(() => {
    if (isGenre) {
      setFormattedData(booksByGenre(data, false));
    }
  }, [isGenre]);

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
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={""}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const renderLabel = useCallback((piePiece) => {
    return `${piePiece.percentage}%`;
  }, []);
  return (
    <Box display="flex" flexDirection={"column"} sx={{ width: "50%", height: '1000px' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <Button variant="contained" onClick={() => setAuthorType("gender")}>
          By Gender
        </Button>
        <Button variant="contained" onClick={() => setAuthorType("nationality")}>
          By Nationality
        </Button>
        <Button variant="contained" onClick={() => setAuthorType("race")}>
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
                color: COLORS[index % COLORS.length]
              };
            })}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
