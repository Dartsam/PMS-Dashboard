import React from "react";
import { Box, TextField, Typography, Grid, MenuItem } from "@mui/material";

export default function ArchiveDetails({ formData, handleChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Archive Details
      </Typography>

      <Grid container spacing={2}>
        {/* Reason for Exit */}
        <Grid item xs={12}>
          <TextField
            id="reason_for_exit"
            name="reason_for_exit"
            label="Reason for Exit"
            fullWidth
            multiline
            rows={3}
            value={formData.reason_for_exit || ""}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>

        {/* Exit Date */}
        <Grid item xs={12} md={6}>
          <TextField
            id="exit_date"
            name="exit_date"
            label="Exit Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.exit_date || ""}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>

        {/* Rehire Eligible */}
        <Grid item xs={12} md={6}>
          <TextField
            id="rehire_eligible"
            name="rehire_eligible"
            label="Rehire Eligible"
            select
            fullWidth
            value={formData.rehire_eligible || ""}
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            <MenuItem value="">Select Option</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
