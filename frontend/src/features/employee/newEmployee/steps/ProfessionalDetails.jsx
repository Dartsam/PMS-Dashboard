import { Box, TextField, Typography, Button, Grid, IconButton } from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";


export default function ProfessionalCertifications({
  formData,
  handleChange,
  handleFileChange,
  handleAddCertificate,
  handleRemoveCertificate,
}
) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Professional Certifications
      </Typography>

      {/* Render certificates */}
      {formData.certificates?.map((cert, index) => (
        <Box key={index} mb={3} p={2} border="1px solid #ddd" borderRadius={2}>
          <Grid container spacing={2}>
            {/* Profession Issuing Body */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Profession Issuing Body"
                name={`certificates[${index}].issuingBody`}
                value={cert.issuingBody || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Certificate ID */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Certificate ID"
                name={`certificates[${index}].certificateId`}
                value={cert.certificateId || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Certificate Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Certificate Name"
                name={`certificates[${index}].certificateName`}
                value={cert.certificateName || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Issue Date */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Issue Date"
                name={`certificates[${index}].issueDate`}
                value={cert.issueDate || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Expiry Date */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Expiry Date"
                name={`certificates[${index}].expiryDate`}
                value={cert.expiryDate || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* License Number */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="License Number"
                name={`certificates[${index}].licenseNumber`}
                value={cert.licenseNumber || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Upload Certificate */}
            <Grid item xs={12}>
              <Typography>Upload Certificate:</Typography>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                name={`certificates[${index}].certificateFile`}
                onChange={(e) => handleFileChange(e, index)}
              />
            </Grid>

            {/* Delete Button (only if >1 certificate) */}
            {formData.certificates.length > 1 && (
              <Grid item xs={12}>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveCertificate(index)}
                >
                  <DeleteOutline />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}

      {/* Add Certificate Button */}
      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={handleAddCertificate}
      >
        {formData.certificates?.length > 0
          ? "Add Another Certificate"
          : "Add Certificate"}
      </Button>
    </Box>
  );
}
