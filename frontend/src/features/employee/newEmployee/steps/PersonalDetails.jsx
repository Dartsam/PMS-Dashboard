import { Box, TextField, Typography, Grid, MenuItem } from "@mui/material";

export default function PersonalDetails({ formData, handleChange, handleFileChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>

      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            name="f_name"
            value={formData.firstname || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="l_name"
            value={formData.lastname || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Home Address"
            name="homeAddress"
            value={formData.homeAddress || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Row 4 */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Date of Birth"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Box mt={2}>
        <Typography>Upload Passport Photograph:</Typography>
        <input
          type="file"
          accept="image/*"
          name="photo"
          onChange={handleFileChange}
        />
      </Box>
      </Grid>
    </Box>
  );
}

