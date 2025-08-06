import { Box, TextField, Typography } from '@mui/material';

export default function PersonalDetails({ formData, handleChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="fullName"
        value={formData.fullName || ''}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Date of Birth"
        type="date"
        name="dob"
        value={formData.dob || ''}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Gender"
        name="gender"
        value={formData.gender || ''}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Phone Number"
        name="phone"
        value={formData.phone || ''}
        onChange={handleChange}
      />
    </Box>
  );
}
