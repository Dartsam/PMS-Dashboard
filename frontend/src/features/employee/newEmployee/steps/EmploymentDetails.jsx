import { Box, TextField, Typography, Grid, MenuItem } from "@mui/material";

export default function EmploymentDetails({ formData, handleChange }) {
  const salaryOptions = [
    { value: "CONHESS", label: "CONHESS" },
    { value: "CONMESS", label: "CONMESS" },
    { value: "CONTOPSAL", label: "CONTOPSAL" },
  ];

  const employmentTypeOptions = [
    { value: "permanent", label: "Permanent" },
    { value: "temporary", label: "Temporary" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "retired", label: "Retired" },
    { value: "deceased", label: "Deceased" },
    { value: "resigned", label: "Resigned" },
    { value: "terminated", label: "Terminated" },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employment Details
      </Typography>

      <Grid container spacing={2}>
        {/* File Number */}
        <Grid item xs={12} md={6}>
          <TextField
            id="file_number"
            name="file_number"
            label="File Number"
            fullWidth
            autoComplete="off"
            value={formData.file_number || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Designation */}
        <Grid item xs={12} md={6}>
          <TextField
            id="designation"
            name="designation"
            label="Designation"
            fullWidth
            value={formData.designation || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Employment Type (dropdown) */}
        <Grid item xs={12} md={6}>
          <TextField
            id="employment_type"
            name="employment_type"
            label="Employment Type"
            select
            fullWidth
            value={formData.employment_type || ""}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            {employmentTypeOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Salary Structure (dropdown) */}
        <Grid item xs={12} md={6}>
          <TextField
            id="salary_structure"
            name="salary_structure"
            label="Salary Structure"
            select
            fullWidth
            value={formData.salary_structure || ""}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            {salaryOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Grade Level */}
        <Grid item xs={12} md={6}>
          <TextField
            id="grade_level"
            name="grade_level"
            label="Grade Level"
            type="number"
            fullWidth
            inputProps={{ min: 1, max: 15 }}
            value={formData.grade_level ?? ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Step */}
        <Grid item xs={12} md={6}>
          <TextField
            id="step"
            name="step"
            label="Step"
            type="number"
            fullWidth
            inputProps={{ min: 1, max: 15 }}
            value={formData.step ?? ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Date of First Appointment (DOFA) */}
        <Grid item xs={12} md={6}>
          <TextField
            id="dofa"
            name="dofa"
            label="Date of First Appointment (DOFA)"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dofa || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Date of Last Promotion (DOLP) */}
        <Grid item xs={12} md={6}>
          <TextField
            id="dolp"
            name="dolp"
            label="Date of Last Promotion (DOLP)"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dolp || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Expected Date of Retirement (EDOR) */}
        <Grid item xs={12} md={6}>
          <TextField
            id="edor"
            name="edor"
            label="Expected Date of Retirement (EDOR)"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.edor || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Status (dropdown) */}
        <Grid item xs={12} md={6}>
          <TextField
            id="status"
            name="status"
            label="Status"
            select
            fullWidth
            value={formData.status || ""}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            {statusOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Department (text for now; later you can replace with select populated from API) */}
        <Grid item xs={12} md={6}>
          <TextField
            id="department"
            name="department"
            label="Department"
            fullWidth
            value={formData.department || ""}
            onChange={handleChange}
            helperText="Use exact department name or wire this field to a department select."
          />
        </Grid>

        {/* Office Email */}
        <Grid item xs={12} md={6}>
          <TextField
            id="office_email"
            name="office_email"
            label="Office Email"
            type="email"
            fullWidth
            value={formData.office_email || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
