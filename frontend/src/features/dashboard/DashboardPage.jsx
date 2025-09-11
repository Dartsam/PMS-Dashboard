import React from "react";
import { Grid } from "@mui/material";

import StatCard from "./components/StatCard";
import AdmissionsChart from "./components/charts/AdmissionsChart";
import GenderChart from "./components/charts/GenderChart";
import TrendsChart from "./components/charts/TrendsChart";

const Dashboard = () => {
  return (
    <Grid container spacing={3} padding={3} columns={12}>
      {/* Top Cards */}
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard title="Patients Admitted" value="120" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard title="Available Beds" value="35" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard title="Doctors On Duty" value="18" />
      </Grid>

      {/* Middle Charts */}
      <Grid size={{ xs: 12, md: 6 }}>
        <AdmissionsChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <GenderChart />
      </Grid>

      {/* Bottom Trend */}
      <Grid size={{ xs: 12 }}>
        <TrendsChart />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
