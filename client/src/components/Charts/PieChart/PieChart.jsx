import { PieChart, Pie, Tooltip } from "recharts";

export default function PieGraph({ data }) {
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      {/* <Pie
      dataKey="value"
      data={data02}
      cx={500}
      cy={200}
      innerRadius={40}
      outerRadius={80}
      fill="#82ca9d"
    /> */}
      <Tooltip />
    </PieChart>
  );
}
