import { Box, TextField, Typography, Grid, MenuItem } from "@mui/material";

const STATE_CHOICES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara"
];

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
            id="username"
            name="username"
            label="Username"
            fullWidth
            autoComplete="username"
            value={formData.username || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="first_name"
            name="first_name"
            label="First Name"
            fullWidth
            autoComplete="given-name"
            value={formData.first_name || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="last_name"
            name="last_name"
            label="Last Name"
            fullWidth
            autoComplete="family-name"
            value={formData.last_name || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="state_of_origin"
            name="state_of_origin"
            label="State of Origin"
            select
            fullWidth
            value={formData.state_of_origin || ""}
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            <MenuItem value="">Select State</MenuItem>
            {STATE_CHOICES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="date_of_birth"
            name="date_of_birth"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            autoComplete="bday"
            value={formData.date_of_birth || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="mobile_number"
            name="mobile_number"
            label="Mobile Number"
            fullWidth
            autoComplete="tel"
            value={formData.mobile_number || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="home_address"
            name="home_address"
            label="Home Address"
            fullWidth
            autoComplete="street-address"
            value={formData.home_address || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Row 4 */}
        <Grid item xs={12} md={6}>
          <TextField
            id="gender"
            name="gender"
            label="Gender"
            select
            fullWidth
            autoComplete="sex"
            value={formData.gender || ""}
            onChange={handleChange}
            sx={{ width: "100%" }}
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Box mt={2}>
            <Typography component="label" htmlFor="photo" sx={{ display: "block", mb: 1 }}>
              Upload Passport Photograph
            </Typography>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              aria-label="Upload passport photograph"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
