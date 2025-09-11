import { Box, TextField, Typography, Button, Grid, IconButton } from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";

export default function ProfessionalCertifications({
  formData,
  handleChange,
  handleFileChange,
  handleAddCertificate,
  handleRemoveCertificate,
}) {
  // ensure certificates array exists
  const certificates = formData.certificates ?? [];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Professional Certifications
      </Typography>

      {/* Render certificates */}
      {certificates.map((cert, index) => (
        <Box
          key={index}
          mb={3}
          p={2}
          border="1px solid #ddd"
          borderRadius={2}
          aria-labelledby={`cert-section-${index}`}
        >
          <Grid container spacing={2}>
            {/* Profession Issuing Body */}
            <Grid item xs={12} md={6}>
              <TextField
                id={`cert-issuing-body-${index}`}
                name={`certificates[${index}].issuing_body`}
                label="Profession Issuing Body"
                fullWidth
                autoComplete="organization"
                value={cert.issuing_body || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Certificate ID */}
            <Grid item xs={12} md={6}>
              <TextField
                id={`cert-id-${index}`}
                name={`certificates[${index}].certificate_id`}
                label="Certificate ID"
                fullWidth
                autoComplete="off"
                value={cert.certificate_id || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Certificate Name */}
            <Grid item xs={12} md={6}>
              <TextField
                id={`cert-name-${index}`}
                name={`certificates[${index}].certificate_name`}
                label="Certificate Name"
                fullWidth
                value={cert.certificate_name || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Issue Date */}
            <Grid item xs={12} md={6}>
              <TextField
                id={`cert-issue-date-${index}`}
                name={`certificates[${index}].issue_date`}
                label="Issue Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={cert.issue_date || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Expiry Date */}
            <Grid item xs={12} md={6}>
              <TextField
                id={`cert-expiry-date-${index}`}
                name={`certificates[${index}].expiry_date`}
                label="Expiry Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={cert.expiry_date || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* License Number */}
            <Grid item xs={12} md={6}>
              <TextField
                id={`cert-license-${index}`}
                name={`certificates[${index}].license_number`}
                label="License Number"
                fullWidth
                value={cert.license_number || ""}
                onChange={handleChange}
              />
            </Grid>

            {/* Upload Certificate */}
            <Grid item xs={12}>
              <Typography component="label" htmlFor={`cert-file-${index}`}>
                Upload Certificate:
              </Typography>
              <input
                id={`cert-file-${index}`}
                aria-label={`Upload certificate file ${index + 1}`}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                name={`certificates[${index}].certificate_file`}
                onChange={(e) => handleFileChange(e, index)}
                style={{ display: "block", marginTop: 8 }}
              />
            </Grid>

            {/* Delete Button (only if >1 certificate) */}
            {certificates.length > 1 && (
              <Grid item xs={12}>
                <IconButton
                  color="error"
                  aria-label={`Remove certificate ${index + 1}`}
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
      <Box mt={2}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={handleAddCertificate}
          disabled={certificates.length >= 10}
          aria-disabled={certificates.length >= 10}
        >
          {certificates.length > 0 ? "Add Another Certificate" : "Add Certificate"}
          {certificates.length >= 10 ? ` (limit ${certificates.length}/10)` : ""}
        </Button>
      </Box>
    </Box>
  );
}
