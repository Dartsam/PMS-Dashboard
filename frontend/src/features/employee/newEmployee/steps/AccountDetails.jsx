import { Box, TextField, Typography } from '@mui/material';

export default function AccountDetails({ formData, handleChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Account Details
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        value={formData.username || ''}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        name="password"
        value={formData.password || ''}
        onChange={handleChange}
      />
    </Box>
  );
}
