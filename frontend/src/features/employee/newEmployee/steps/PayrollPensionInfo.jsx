import { Box, TextField, Typography, Grid, MenuItem } from "@mui/material";

export default function PayrollPensionInfo({ formData, handleChange }) {
  const salaryOptions = [
    { value: "CONHESS", label: "CONHESS" },
    { value: "CONMESS", label: "CONMESS" },
    { value: "CONTOPSAL", label: "CONTOPSAL" },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payroll & Pension Details
      </Typography>

      <Grid container spacing={2}>
        {/* Account Number */}
        <Grid item xs={12} md={6}>
          <TextField
            id="account_number"
            name="account_number"
            label="Account Number"
            fullWidth
            autoComplete="off"
            value={formData.account_number || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Paypoint */}
        <Grid item xs={12} md={6}>
          <TextField
            id="paypoint"
            name="paypoint"
            label="Paypoint"
            fullWidth
            value={formData.paypoint || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* PFA Number */}
        <Grid item xs={12} md={6}>
          <TextField
            id="pfa_number"
            name="pfa_number"
            label="PFA Number"
            fullWidth
            value={formData.pfa_number || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* PFA Name */}
        <Grid item xs={12} md={6}>
          <TextField
            id="pfa_name"
            name="pfa_name"
            label="PFA Name"
            fullWidth
            value={formData.pfa_name || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* PFA Code */}
        <Grid item xs={12} md={6}>
          <TextField
            id="pfa_code"
            name="pfa_code"
            label="PFA Code"
            fullWidth
            value={formData.pfa_code || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* IPPIS Number (kept in form; server may expect it under account) */}
        <Grid item xs={12} md={6}>
          <TextField
            id="ippis_number"
            name="ippis_number"
            label="IPPIS Number"
            fullWidth
            value={formData.ippis_number || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Salary Structure (dropdown - matches Employee model choices) */}
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
      </Grid>
    </Box>
  );
}
