
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/nom_roll/api/";

export default function Profile({ employeeId: propId }) {
  const { id: routeId } = useParams();
  const employeeId = propId || routeId || "7101"; // fallback for demo

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_BASE}${employeeId}/`);
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [employeeId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  if (!data) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>No data returned from API.</Typography>
      </Paper>
    );
  }

  // Destructure API fields
  const personal = data.personal_records || {};
  const employee = data.employee_details || {};
  const account = data.account_details || {};

  const firstName = data.first_name || personal.first_name || "";
  const lastName = data.last_name || personal.last_name || "";
  const avatar = data.avatar || "";
  const signature = data.signature || ""
  const email = data.email || personal.email || "";

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Employee Profile
      </Typography>

      <Grid container spacing={2}>
        {/* Avatar + Name */}
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar src={avatar} sx={{ width: 96, height: 96, mx: "auto", mb: 1 }}>
              {(firstName?.[0] || lastName?.[0] || "U").toUpperCase()}
            </Avatar>
            <Typography variant="subtitle2">
              {firstName} {lastName}
            </Typography>
            <Typography variant="caption">{employee.department}</Typography>
          </Box>
        </Grid>

        {/* Personal Details */}
        <Grid item xs={12} md={9}>
          <Typography variant="subtitle1" gutterBottom>
            Personal Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="First Name" value={personal.first_name || firstName} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Last Name" value={personal.last_name || lastName} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Date of Birth" value={personal.date_of_birth || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Gender" value={personal.gender || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="State of Origin" value={personal.state_of_origin || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Mobile Number" value={personal.mobile_number || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" value={email} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Home Address" value={personal.home_address || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>
        </Grid>

        {/* Employment Details */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Employment Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField label="File Number" value={employee.file_number || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Designation" value={employee.designation || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Department" value={employee.department || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Employment Type" value={employee.employment_type || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Salary Structure" value={employee.salary_structure || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField label="Grade Level" value={employee.grade_level || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField label="Step" value={employee.step || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="DOFA" value={employee.dofa || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="DOLP" value={employee.dolp || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="EDOR" value={employee.edor || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="Status" value={employee.status || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>
        </Grid>

        {/* Account Details */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Account Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField label="IPPIS No" value={account.ippis_no || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Account Number" value={account.account_number || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Paypoint" value={account.paypoint || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="PFA" value={account.pfa_no?.pfa || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="PFA Number" value={account.pfa_no?.pfa_no || ""} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>
        </Grid>
        {/* Signature */}
        <Grid item xs={12} sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="subtitle1" gutterBottom>
            Signature
          </Typography>
          <img
            src={signature} // make sure this is a PNG with transparent background
            alt="Signature"
            style={{
              width: "150px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Grid>

      </Grid>
    </Paper>
  );
}


