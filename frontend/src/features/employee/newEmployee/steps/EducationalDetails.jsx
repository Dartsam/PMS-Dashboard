import { Box, Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";

export default function EducationalDetails({
  formData,
  handleChange,
  handleAddEducation,
  handleRemoveEducation,
}) {
  const educationLevels = ["Primary", "Secondary", "Tertiary"];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Educational Background
      </Typography>

      {educationLevels.map((level) => (
        <Box key={level} mb={4}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            {level} Education
          </Typography>

          {/* Render rows for each education level */}
          {formData.education?.[level]?.map((entry, index) => (
            <Box
              key={index}
              mb={2}
              p={2}
              border="1px solid #ddd"
              borderRadius={2}
              className="mb-3"
            >
              <Grid container spacing={2}>
                {/* Name of Institution */}
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Institution Name"
                    name={`education.${level}[${index}].name`}
                    value={entry.name || ""}
                    onChange={handleChange}
                  />
                </Grid>

                {/* From Year */}
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="From (YYYY)"
                      InputLabelProps={{ shrink: true }}
                    name={`education.${level}[${index}].from`}
                    value={entry.from || ""}
                    onChange={handleChange}
                  />
                </Grid>

                {/* To Year */}
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="To (YYYY)"
                      InputLabelProps={{ shrink: true }}
                    name={`education.${level}[${index}].to`}
                    value={entry.to || ""}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Qualification Obtained */}
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Qualification Obtained"
                    name={`education.${level}[${index}].qualification`}
                    value={entry.qualification || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              {/* Delete Row (if more than 1) */}
              {formData.education?.[level]?.length > 1 && (
                <Box mt={1}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveEducation(level, index)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))}

          {/* Add Row Button */}
          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={() => handleAddEducation(level)}
          >
            Add Row for {level}
          </Button>
        </Box>
      ))}
    </Box>
  );
}
