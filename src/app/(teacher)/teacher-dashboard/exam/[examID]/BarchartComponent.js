"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function BarchartComponent({ data, dataKey }) {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#F9562C" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarchartComponent;
