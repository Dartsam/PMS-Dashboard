import { Box, TextField, Typography } from '@mui/material';

export default function AcademicDetails({ formData, handleChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Academic Details
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Highest Qualification"
        name="qualification"
        value={formData.qualification || ''}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Institution Name"
        name="institution"
        value={formData.institution || ''}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Year of Graduation"
        type="number"
        name="gradYear"
        value={formData.gradYear || ''}
        onChange={handleChange}
      />
    </Box>
  );
}
