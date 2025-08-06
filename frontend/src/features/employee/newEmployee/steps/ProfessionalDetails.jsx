import { Box, TextField, Typography, Button } from '@mui/material';

export default function ProfessionalDetails({ formData, handleChange, handleFileChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Professional Details
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Position"
        name="position"
        value={formData.position || ''}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Department"
        name="department"
        value={formData.department || ''}
        onChange={handleChange}
      />

      <Box mt={2}>
        <Typography>Upload Resume/CV:</Typography>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          name="resume"
          onChange={handleFileChange}
        />
      </Box>

      <Box mt={2}>
        <Typography>Upload Passport Photograph:</Typography>
        <input
          type="file"
          accept="image/*"
          name="photo"
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
}
