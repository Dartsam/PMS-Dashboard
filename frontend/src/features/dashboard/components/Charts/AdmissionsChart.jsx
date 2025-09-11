
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { department: "Psychiatry", patients: 50 },
  { department: "Pediatrics", patients: 20 },
  { department: "General", patients: 30 },
  { department: "Emergency", patients: 25 },
];

const AdmissionsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="patients" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AdmissionsChart;