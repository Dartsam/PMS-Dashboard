
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", admissions: 20 },
  { day: "Tue", admissions: 35 },
  { day: "Wed", admissions: 25 },
  { day: "Thu", admissions: 40 },
  { day: "Fri", admissions: 30 },
  { day: "Sat", admissions: 20 },
  { day: "Sun", admissions: 15 },
];

const TrendsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="admissions" stroke="#66BB6A" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendsChart;