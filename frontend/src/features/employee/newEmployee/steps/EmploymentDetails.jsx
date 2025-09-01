import { Box, TextField, Typography, Grid } from "@mui/material";

export default function EmploymentDetails({ formData, handleChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employment Details
      </Typography>

      <Grid container spacing={2}>
        {/* File Number */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="File Number"
            name="fileNumber"
            value={formData.fileNumber || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Designation */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Designation"
            name="designation"
            value={formData.designation || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Employment Type */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Salary Structure */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Salary Structure"
            name="salaryStructure"
            value={formData.salaryStructure || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Grade Level */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Grade Level"
            name="gradeLevel"
            value={formData.gradeLevel || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Step */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Step"
            name="step"
            value={formData.step || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Date of First Appointment */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Date of First Appointment (DOFA)"
            name="dofa"
            value={formData.dofa || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Date of Last Promotion */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Date of Last Promotion (DOLP)"
            name="dolp"
            value={formData.dolp || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Expected Date of Retirement */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Expected Date of Retirement (EDOR)"
            name="edor"
            value={formData.edor || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Status */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Department */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Office Email */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="email"
            label="Office Email"
            name="officeEmail"
            value={formData.officeEmail || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* IPPIS Number */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="IPPIS Number"
            name="ippisNumber"
            value={formData.ippisNumber || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
