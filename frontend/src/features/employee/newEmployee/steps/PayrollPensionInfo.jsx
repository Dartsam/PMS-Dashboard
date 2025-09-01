import { Box, TextField, Typography, Grid } from "@mui/material";

export default function PayrollPensionInfo({ formData, handleChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payroll & Pension Details
      </Typography>

      <Grid container spacing={2}>
        {/* Account Number */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Account Number"
            name="accountNumber"
            value={formData.accountNumber || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Paypoint */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Paypoint"
            name="paypoint"
            value={formData.paypoint || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* PFA Number */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="PFA Number"
            name="pfaNumber"
            value={formData.pfaNumber || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* PFA Name */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="PFA Name"
            name="pfaName"
            value={formData.pfaName || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* PFA Code */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="PFA Code"
            name="pfaCode"
            value={formData.pfaCode || ""}
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
      </Grid>
    </Box>
  );
}
